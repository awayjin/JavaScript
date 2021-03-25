const REGEXP_OS_ANDROID = /android/i;
const REGEXP_OS_IOS = /iphone|ipad|ipod/i;

const REGEXP_APP_WECHAT = /micromessenger/i;
const REGEXP_APP_ZHUZHER = /zhuzher/i;
const REGEXP_APP_LEBANG = /VKStaffAssistant/i;

export const platformUtils = (userAgent?: Window['navigator']['userAgent']) => {
  const { screen, navigator } = window;

  const ua = userAgent || navigator.userAgent;

  const isAndroid = REGEXP_OS_ANDROID.test(ua);

  const isIos = REGEXP_OS_IOS.test(ua);

  const isInZhuzher = REGEXP_APP_ZHUZHER.test(ua);

  const isInZhuYingTai = REGEXP_APP_LEBANG.test(ua);

  const isInWechat = REGEXP_APP_WECHAT.test(ua);

  const isIPhoneX = isIos && screen.height === 812 && screen.width === 375;

  return {
    isAndroid,
    isIos,
    isIPhoneX,
    isInZhuzher,
    isInZhuYingTai,
    isInWechat,
  };
};

const platform = platformUtils();
export default platform;
