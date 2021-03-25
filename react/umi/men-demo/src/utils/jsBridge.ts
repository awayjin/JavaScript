import JSBridge from 'sense-jsbridge';
import { isInZhuzher } from './env';
// todo 接入助英台和企业微信，如果接口差异不大的话，统一包装一层；否则就分开各个sdk
const jsBridge = new JSBridge();

export default jsBridge;

type ICallback<D = any> = (data: D) => void;

/**
 * 获取项目信息
 */
export const getProject = (callback: ICallback) => {
  if (isInZhuzher) {
    jsBridge.getProject(res => {
      callback(res);
    });
  }
};

/**
 * 显示TabBar
 */
export const showTabBar = () => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 0 });
  }
};

/**
 * 隐藏TabBar
 */
export const hideTabBar = () => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 1 });
  }
};

/**
 * 关闭webview
 */
export const closeWebView = () => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 2 });
  }
};

/**
 * 新web窗口打开 url
 */
export const newWebView = (url: Location['href']) => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 3, url });
  }
};

/**
 * 隐藏titleBar
 */
export const hideTitleBar = () => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 4 });
  }
};

/**
 * 显示titleBar
 */
export const showTitleBar = () => {
  if (isInZhuzher) {
    jsBridge.wvcontrol({ actionType: 5 });
  }
};

type ISharePlatform = 'WECHAT_CHAT' | 'WECHAT_TIMELINE' | 'APP_CHAT';

type IShareParams = {
  title: string; // '标题',
  desc?: string; // '描述',
  link: string; // '链接',
  // '图片(url,或者baseRequest4的图片数据)',
  // imgUrl 住这儿APP iOs 分享邻居聊天是必传
  imgUrl?: string;
  webpageUrl?: string; // '小程序失败时，备用跳转页面',
  program_id?: string; // '小程序原始ID，gh_xxxx',
  path?: string; // '小程序内部页面路径',
  // type: 'image', image：分享图片， webpage：分享，miniPro：小程序(也可直接根据program_id来判断)
  // type 在住这儿APP iOs下为必传
  type?: string;
  platform: ISharePlatform | ISharePlatform[]; // 'WECHAT_CHAT'// 平台: WECHAT_CHAT, WECHAT_TIMELINE,APP_CHAT(//4.1.2 分享到App群聊)
};

/**
 * params.platform 传入数组就调起原生分享列表，传入单个平台直接分享
 * @param params
 * @param callback
 */
export const share = (params: IShareParams, callback?: ICallback) => {
  if (isInZhuzher) {
    if (Array.isArray(params.platform)) {
      jsBridge.shareByAppDialog(params, callback);
    } else {
      jsBridge.share(params, callback);
    }
  }
};

/**
 * 4、获取业务token
 * @param params 实例
 * {
 *   type:0, //@Deprecated，推荐使用businessType  0-商城token，1-二手市场,不传默认为0//由于之前挖了坑，只支持了0和非0，现在用新字段bussinessType来表示
 *   businessType:0//0-商城token，1-二手市场，2-优惠券  //如果有bussinessType字段，先取bussinessType，不然再取type
 * }
 * @param response
 */
export enum tokenBusinessType {
  shop, // 0-商城token
  secondhand, // 1-二手市场
  coupon, // 2-优惠券
}
export const getUserToken = (
  type: tokenBusinessType,
  callback: ICallback<{ token: string }>,
) => {
  if (isInZhuzher) {
    jsBridge.getUserToken({ businessType: type }, res => {
      if (res.code === 0) {
        callback(res.data);
      } else {
        throw new Error(res.msg);
      }
    });
  }
};

/**
 * 5、获取app数据
 * @param response
 */
// {
//   code: 0, //0-调用成功  非0-调用失败
//   msg: '', //code非0时，表示具体的错误描述信息
//   data: {
//     avatar: '', //头像
//     mobile: '', //手机号
//     name: '', //昵称
//     token: '', //falcon token
//     userId: '', //falcon id //4.1.4
//     role: '', //用户身份     //4.1.4
//   },
// }
export const getUserBasic = (
  callback: ICallback<{
    avatar: string; // 头像
    mobile: string; // 手机号
    name: string; // 昵称
    token: string; // falcon token
    userId: string; // falcon id //4.1.4
    role: string; // 用户身份     //4.1.4
  }>,
) => {
  if (isInZhuzher) {
    jsBridge.getUserBasic(res => {
      if (res.code === 0) {
        callback(res.data);
      } else {
        throw new Error(res.msg);
      }
    });
  }
};

/**
 *
 * @param maxCount 最大上传数量
 * @param callback
 */
type IBase64Ary = string[];
export const selectImg = (
  maxCount: number,
  callback: ICallback<IBase64Ary>,
) => {
  if (isInZhuzher) {
    if (maxCount > 10) {
      throw new Error('最多选择10张');
    }
    jsBridge.selectImg(maxCount, res => {
      if (res.code === 0) {
        callback(res.data);
      } else {
        throw new Error(res.msg);
      }
    });
  }
};
