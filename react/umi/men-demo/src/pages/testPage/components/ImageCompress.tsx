import React, { useState, useEffect, FC } from 'react';
import { Button, List, Stepper } from 'antd-mobile';
import { pickImg } from '@/utils/pickImg';
import { uploadHelper, uploadImg } from '@sense/utils';
import { useRequest } from 'umi';
import { fetchOss } from '@/services/uploadOss';
import useLoading from '@/hooks/useLoading';

const { Item } = List;

const ImageCompress: FC = () => {
  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const [file, setFile] = useState<File | undefined>(undefined);

  const [compressFile, setCompressFile] = useState<File | undefined>(undefined);

  const [base64, setBase64] = useState<string[]>([]);

  const mb = (bit?: number) => {
    if (bit) {
      return bit / 1024 / 1024;
    }
    return 0;
  };

  const [loading, setLoading] = useState(false);
  useLoading(loading);
  return (
    <List renderHeader={() => '图片压缩'}>
      <Item>
        {base64.length === 2 ? (
          <div>
            原图：
            <img
              style={{
                width: '100vw',
                height: 'auto',
                display: 'block',
              }}
              src={base64[0]}
              alt=""
            />
            压缩后：
            <img
              style={{
                width: '100vw',
                height: 'auto',
                display: 'block',
              }}
              src={base64[1]}
              alt=""
            />
          </div>
        ) : null}
      </Item>
      <Item>压缩前大小：{mb(file?.size)} MB </Item>
      <Item>压缩后大小：{mb(compressFile?.size)}MB</Item>
      <Item>
        <input
          type="file"
          onChange={async e => {
            const f = e.target.files[0];
            setLoading(true);
            console.time();
            if (f) {
              uploadHelper
                .compress(f, {
                  maxSizeMB: 1, // 期望的最大值
                  useWebWorker: true,
                })
                .then(async c => {
                  setFile(f);
                  setCompressFile(c);
                  console.timeEnd();
                  const fbase64 = await toBase64(f);
                  const cbase64 = await toBase64(c);
                  setBase64([fbase64, cbase64]);
                  setLoading(false);
                });
            }
          }}
          name=""
          id=""
        />
      </Item>
    </List>
  );
};

export default ImageCompress;
