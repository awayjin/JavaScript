import { RequestConfig, ErrorShowType } from 'umi';
import * as Sentry from '@sentry/browser';

type IErrorConfig = RequestConfig['errorConfig'];
export const errorConfig: IErrorConfig = {
  adaptor: (resData, ctx) => {
    // 拦截 http 错误 上报sentry
    const { status } = ctx.res; // 只有http请求失败才有 如http code 400
    if (status !== undefined) {
      const { url, statusText, headers } = ctx.res;
      Sentry.captureException({
        resData: JSON.stringify(resData),
        url,
        statusText,
        headers,
        status,
        info: '请求错误, http',
      });
      return {
        data: resData,
        success: false,
        showType: ErrorShowType.ERROR_MESSAGE,
        errorMessage: resData.message || resData.error,
      };
    }

    // 拦截业务码错误

    const successCode = [0, 200]; // 成功的业务码
    if (!successCode.includes(resData.code)) {
      Sentry.captureException({
        resData: JSON.stringify(resData),
        info: '请求正常, 业务码不对',
      });

      return {
        data: resData,
        success: false,
        showType: ErrorShowType.WARN_MESSAGE,
        errorCode: resData.code,
        errorMessage: resData.message || resData.error,
      };
    }

    return {
      data: resData,
      success: true,
      showType: ErrorShowType.ERROR_MESSAGE,
      errorMessage: resData.message || resData.error,
    };
  },
};
