import env, { isInWechat, isProduction } from '@/utils/env';
import { isFunction } from '.';

const sdkState: {
  init: boolean; // 是否开始初始化
  load: boolean; // script 是否load 完成
  ready: boolean; // wx 是否ready
  readyHooks: Array<() => void>;
} = {
  init: false, // 是否开始初始化
  load: false, // script 是否load 完成
  ready: false, // wx 是否ready
  readyHooks: [],
};

// 自定义事件，用于发布订阅
export const sdkEvents = {
  wxSdkLoad: new Event('wxSdkLoad'),
};

/**
 * 初始化wx sdk，只会初始化一次
 * @param readyHook wx.ready 的钩子
 */
export function loadWxSdk(readyHook?: () => void) {
  // 非生产环境微信SDK checkJsApi判断有问题
  if (!isInWechat || !isProduction) {
    return;
  }

  // 收集ready 的回调
  if (isFunction(readyHook)) {
    sdkState.readyHooks.push(readyHook);
  }

  // 初始化之后就不在初始化
  if (sdkState.init) {
    return;
  }

  sdkState.init = true;

  const script = document.createElement('script');

  script.onload = () => {
    sdkState.load = true;
    document.dispatchEvent(sdkEvents.wxSdkLoad);
    // 这个sdk 必须执行shareTimeline才能初始化微信
    (window as any).shareTimeline({});

    const timer = setInterval(() => {
      if (wx) {
        wx.checkJsApi({
          jsApiList: ['chooseImage'],
          success: res => {
            if (res.checkResult.chooseImage) {
              sdkState.ready = true;

              // 执行 ready hooks
              sdkState.readyHooks.forEach(v => {
                if (isFunction(v)) {
                  v();
                }
              });
            }
          },
        });
        clearInterval(timer);
      }
    }, 100);
  };

  script.src = `${env.BLACKPEARL_HOST}/interfaces/share/wechat/jssdk`;
  document.body.appendChild(script);
}

/**
 * wx sdk 是否下载完
 */
export const wxInit = () => sdkState.init;

/**
 * wx sdk 是否下载完
 */
export const wxLoaded = () => sdkState.load;

/**
 * wx sdk 是否ready
 */
export const wxReady = () => sdkState.ready;
