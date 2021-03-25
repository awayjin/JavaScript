/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
import imageCompression from 'browser-image-compression';
import moment from 'dayjs';
import env from '@/utils/env';
import { Toast } from 'antd-mobile';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// 下面这个库没有类型声明，就直接关闭ts校验
import randomize from 'randomatic';

/**
 * 压缩base64
 * @param {*} base64Url
 * @return base64Url
 */
export async function compressBase64(base64Url: string) {
  const options = {
    maxSizeMB: 4,
    useWebWorker: false,
  };
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    let file = await imageCompression.getFilefromDataUrl(base64Url);
    file = await imageCompression(file, options);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const bae64Res = await imageCompression.getDataUrlFromFile(file);
    return bae64Res;
  } catch (error) {
    return base64Url;
  }
}

/**
 * 上传base64文件到七牛云，返回图片地址
 * @param {base64 } base64
 * @param {bool } needCompress 是否要压缩
 * @return {base64url} imgUrl
 */
export async function uploadTo7Niu(base64Url: string, needCompress = true) {
  let base64 = base64Url;
  if (needCompress) {
    base64 = await compressBase64(base64);
  }
  const key = getKey(base64);
  const imgUrl = await uploadBase64ToQiniu(base64, key);

  return imgUrl;
}

/**
 * 以base64 方式上传图片到七牛
 * @param {*} base64Data
 */
async function uploadBase64ToQiniu(base64Url: string, key: string) {
  const data = base64Url.split('base64,')[1];
  const tokenJson = await fetchQiniuToken();
  const keyJson = await uploadBase64File(tokenJson.token, data, key);
  const imgUrl = `${env.QINIU_DOMAIN}/${keyJson.key}`;
  return imgUrl;
}

/**
 * 获取七牛token
 */
function fetchQiniuToken() {
  return fetch(`${env.FG_HOST}/flea_market/upload`, {
    method: 'POST',
  }).then(resp => {
    if (resp.ok) {
      return resp.json();
    }
    return new Error('fetch qiniu token error');
  });
}

/**
 * 上传base64
 * @param {*} token
 * @param {*} base64ParsedFile
 */
function uploadBase64File(
  token: string,
  base64ParsedFile: string,
  key: string,
) {
  key = btoa(key);
  return new Promise<{ key: string }>((resolve, reject) => {
    const url = `${env.QINIU_UPLOAD_DOMAIN}/putb64/-1/key/${key}`;
    const xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(
            Error(`${xhr.status}:${xhr.responseText} cannot upload image`),
          );
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Authorization', `UpToken ${token}`);
    xhr.send(base64ParsedFile);
  });
}

/**
 * 生成文件名
 * @param bae64
 */
function getKey(bae64: string) {
  const ext = bae64.split(';base64,')[0].split('data:image/')[1];
  const key = moment().format('YYYY-MM-DD-');
  const hash = randomize('Aa0', 10);
  return `${key + hash}.${ext}`;
}

/**
 * 上传图片 返回图片地址
 * @param base64Url
 *
 */
export default async function uploadImg(
  base64Url: string,
  qiniuSuffix = '?imageView2/2/w/500', // 缩略图后缀
  needCompress = true,
) {
  try {
    // 上传到7牛云
    const imgUrl = await uploadTo7Niu(base64Url, needCompress);
    // 下载缩略图
    const thumb = imgUrl + qiniuSuffix;
    await loadImg(thumb);
    // 用缩略图设置state的file 用以显示
    return {
      thumb,
      imgUrl,
    };
  } catch (e) {
    Toast.info(`上传失败 ${e}`);
    throw e;
  }
}

/**
 * 下载远程图片
 * @param {} url
 */
async function loadImg(url: string) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(url);
      };
    } catch (e) {
      reject(e);
    }
  });
}
