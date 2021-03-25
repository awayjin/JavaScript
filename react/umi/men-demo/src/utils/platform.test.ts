import { platformUtils } from './platform';

describe('platform', () => {
  it('platform in ios wechat', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.5(0x17000523) NetType/WIFI Language/en';

    const result = platformUtils(ua);

    expect(result.isAndroid).toBe(false);
    expect(result.isIos).toBe(true);
    expect(result.isIPhoneX).toBe(false);
    expect(result.isInZhuzher).toBe(false);
    expect(result.isInZhuYingTai).toBe(false);
    expect(result.isInWechat).toBe(true);
  });

  it('platform in ios zhuzher', () => {
    const ua =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 vanke_app_version/4.6.5 X_API_VERSION/20190428 vanke_app/zhuzher';

    const result = platformUtils(ua);

    expect(result.isAndroid).toBe(false);
    expect(result.isIos).toBe(true);
    expect(result.isIPhoneX).toBe(false);
    expect(result.isInZhuzher).toBe(true);
    expect(result.isInZhuYingTai).toBe(false);
    expect(result.isInWechat).toBe(false);
  });

  it('platform in android zhuzher', () => {
    const ua =
      'Mozilla/5.0 (Linux; Android 9; ONEPLUS A6000 Build/PKQ1.180716.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 vanke_app/zhuzher vanke_app_version/115 X_API_VERSION/20190910';

    const result = platformUtils(ua);

    expect(result.isAndroid).toBe(true);
    expect(result.isIos).toBe(false);
    expect(result.isIPhoneX).toBe(false);
    expect(result.isInZhuzher).toBe(true);
    expect(result.isInZhuYingTai).toBe(false);
    expect(result.isInWechat).toBe(false);
  });

  it('platform in android lebang', () => {
    const ua =
      'VKStaffAssistant-Android-4.0.5_task-Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36';

    const result = platformUtils(ua);

    expect(result.isAndroid).toBe(true);
    expect(result.isIos).toBe(false);
    expect(result.isIPhoneX).toBe(false);
    expect(result.isInZhuzher).toBe(false);
    expect(result.isInZhuYingTai).toBe(true);
    expect(result.isInWechat).toBe(false);
  });
});
