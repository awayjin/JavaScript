/* eslint-disable no-undef */
import React, { FC, useState, useCallback } from 'react';
import { Modal, ImagePicker, Toast } from 'antd-mobile';
import { isInZhuzher } from '@/utils/env';
import { isFunction } from '@/utils/index';
import useWxSdk from '@/hooks/useWxSdk';
import { pickImg } from '@/utils/pickImg';
import { uploadImg, OssImgSuffix } from '@sense/utils';
import { requestOss } from '@/services/uploadOss';
/**
 * 选择上传图片
 */

// 图片文件数组,元素为对象,包含属性 url（必选, 可能还有id, orientation, 以及业务需要的其它属性
export type IFiles = {
  url: string;
  imgUrl: string;
  uploaded?: boolean; // 是否已上传
  [p: string]: any;
}[];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFn = () => {};
interface IProps {
  filenamePrefix?: string; // 默认文件名为 YYYY/MM/DD/uuid.ext, 你可以给这个文件名增加前缀
  uploadSuccess?: (imgUrl: string[]) => void;
  onChange?: (files: IFiles) => void;
  // 可以自定义上传方法
  uploadHandle?: (
    base64Url: string,
  ) => Promise<{ imgUrl: string; thumb: string }>;
  maxCount?: number;
  multiple?: boolean;
  selectable?: boolean;
  disableDelete?: boolean;
  defaultFiles?: string[];
  bucket?: IBucket;
  useCheck?: boolean;
  checkOptions?: {
    maxSizeMB?: number; // mb
    width?: number; // 图片的宽度，不一样就不匹配，
    height?: number;
  };
  useCompress?: boolean;
}

type IUploadHandle = (
  base64Url: string,
) => Promise<{ imgUrl: string; thumb: string }>;

type IBucket =
  | 'vk-fg-test'
  | 'uiis-test'
  | 'black-pearl-test'
  | 'vanke-app-test'
  | 'lebang-test'
  | 'lebang-notice-test'
  | 'projectwiki-test'
  | 'vk-fg-test';

const PickAndUploadImg: FC<IProps> = ({
  uploadSuccess,
  onChange,
  uploadHandle,
  maxCount = 1,
  multiple = false,
  selectable = true,
  disableDelete = false,
  defaultFiles = [],
  bucket = 'vk-fg-test',
  useCheck,
  checkOptions,
  useCompress,
  filenamePrefix,
}) => {
  const uploadHandleInner: IUploadHandle = useCallback(
    async base64 => {
      const { result } = await requestOss(bucket);
      if (result.security_token) {
        // console.log(filenamePrefix, 'filenamePrefix');
        const res = await uploadImg({
          base64,
          useCheck,
          checkOptions,
          useCompress,
          filenamePrefix,
          oss: {
            region: 'oss-cn-shenzhen',
            bucket,
            stsToken: result.security_token,
            accessKeyId: result.access_key_id,
            accessKeySecret: result.access_key_secret,
          },
        });
        if (res.checkPass === false) {
          throw new Error(`图片校验出错 ${res.checkFailOptions}`);
        }
        return {
          imgUrl: res.url,
          thumb: new OssImgSuffix(res.url).resize({ w: 200 }).quality({ q: 80 })
            .url,
        };
      }
      throw new Error('上传图片获取 ticket失败');
    },
    [bucket, checkOptions, useCheck, useCompress],
  );

  const [files, setFiles] = useState<IFiles>([
    ...defaultFiles.map(s => {
      return {
        url: new OssImgSuffix(s).resize({ w: 500 }).url,
        imgUrl: s,
        uploaded: true,
      };
    }),
  ]);

  const [wxSdkReady] = useWxSdk();

  const upload: IUploadHandle = isFunction(uploadHandle)
    ? uploadHandle
    : uploadHandleInner;
  /**
   * 上传成功之后的处理
   * @param opt
   */
  const afterUploadSuccess = useCallback(
    (opt: { imgUrl: string; thumb: string }[]) => {
      const newFiles = [
        ...files,
        ...opt.map(v => ({
          url: v.thumb, // 使用缩略图展示
          imgUrl: v.imgUrl,
          uploaded: true, // 标志上传成功
        })),
      ];

      if (isFunction(onChange)) {
        onChange(newFiles);
      }
      setFiles(newFiles);

      if (isFunction(uploadSuccess)) {
        uploadSuccess(opt.map(v => v.imgUrl));
      }
    },
    [uploadSuccess, files, onChange, setFiles],
  );

  /**
   * 浏览器 input type=file 选择图片并上传
   */
  const defaultPick = useCallback(
    async (base64Ary: string[]) => {
      Toast.loading('上传中...', 0, emptyFn, true);

      try {
        const pl = await Promise.all(base64Ary.map(base64 => upload(base64)));
        afterUploadSuccess(pl);
        Toast.hide();
      } catch (e) {
        Toast.info(e.message);
        console.error(e);
      }
    },
    [afterUploadSuccess, upload],
  );

  const otherPick = useCallback(
    async (e: Event) => {
      // 取消input 的默认事件
      e.preventDefault();

      const base64Ary = await pickImg(multiple ? maxCount - files.length : 1);
      if (base64Ary.length) {
        Toast.loading('上传中...', 0, emptyFn, true);
      }
      try {
        const pl = await Promise.all(base64Ary.map(base64 => upload(base64)));
        afterUploadSuccess(pl);

        Toast.hide();
      } catch (err) {
        Toast.info(err.message);
      }
    },
    [afterUploadSuccess, files, maxCount, multiple, upload],
  );

  const onImgChange = useCallback(
    async (
      // eslint-disable-next-line no-shadow
      files: IFiles,
      operationType: string,
      index?: number,
    ) => {
      if (operationType === 'add') {
        // 上传完成的图片会有uploaded为true，这里过滤需要上传的图片
        defaultPick(files.filter(v => !v.uploaded).map(v => v.url));
      }
      if (operationType === 'remove') {
        Modal.alert('', '确定删除么?', [
          { text: '取消' },
          {
            text: '确定',
            style: {
              color: '#393939',
            },
            onPress: () => {
              if (isFunction(onChange)) {
                onChange(files);
              }
              setFiles(files);
            },
          },
        ]);
      }
    },
    [defaultPick, onChange, setFiles],
  );

  // 住这儿和微信用sdk选择图片
  if (isInZhuzher || wxSdkReady) {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <ImagePicker
        files={files}
        onChange={onImgChange}
        selectable={files.length < maxCount && selectable}
        disableDelete={disableDelete}
        onAddImageClick={otherPick}
      />
    );
  }

  return (
    <ImagePicker
      files={files}
      multiple
      selectable={files.length < maxCount && selectable}
      // antd 定义的类型和实际不符
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      onChange={onImgChange}
      disableDelete={disableDelete}
    />
  );
};
export default PickAndUploadImg;
