import { selectImg } from '@/utils/jsBridge';
import { isInZhuzher } from '@/utils/env';
import { wxReady } from '@/utils/wxsdk';
/**
 * wx sdk 选择图片
 * @param callback
 */
type IBase64Ary = string[];
// type IPickCallBack = (base64: IBase64Ary) => void;

function wxPickImg(maxCount = 1) {
  return new Promise<IBase64Ary>((resolve, reject) => {
    if (wx) {
      wx.chooseImage({
        count: maxCount, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          const { localIds } = res; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          const localDatas: IBase64Ary = []; // 图片数据

          localIds.forEach((localId, i) => {
            wx.getLocalImgData({
              localId, // 图片的localID
              // eslint-disable-next-line no-shadow
              success: async res => {
                let { localData } = res; // localData是图片的base64数据，可以用img标签显示
                if (localData.indexOf('data:image') !== 0) {
                  localData = `data:image/jpeg;base64,${localData}`;
                }

                localDatas.push(localData);

                if (localDatas.length === localIds.length) {
                  resolve(localDatas);
                  // callback();
                }
              },
              fail(err) {
                reject(err);
              },
            });
          });
        },
      });
    } else {
      reject(Error('找不到wx'));
    }
  });
}
function zzePickImg(maxCount = 1) {
  return new Promise<IBase64Ary>((resolve, reject) => {
    selectImg(maxCount, async file => {
      resolve(file);
    });
  });
}

/**
 * 选择图片，自动切换微信sdk和住这儿
 * @param maxCount 选择多张，最多6张
 */
export async function pickImg(maxCount = 1) {
  if (wxReady()) {
    const files = await wxPickImg(maxCount);
    return files;
  }
  if (isInZhuzher) {
    const files = await zzePickImg(maxCount);
    return files;
  }
  throw Error('暂无选择图片方法');
}
