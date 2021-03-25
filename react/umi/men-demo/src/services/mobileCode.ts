// 手机验证码
import env from '@/utils/env';
import { IRequestOptionsInit } from './interface';

export const fetchSendCode = (
  mobile: string,
  service = 'verify_zhuzher_mobile',
  xApiVersion = '20200213',
): IRequestOptionsInit => {
  const data = JSON.stringify({ mobile, service });
  return {
    url: `${env.FD_API_HOST}/api/zhuzher/captcha/codes`,
    method: 'POST',
    headers: {
      'X-API-Version': xApiVersion,
    },
    data,
  };
};

export const fetchVerySms = (
  mobile: string,
  code: string,
  service = 'verify_zhuzher_mobile',
  xApiVersion = '20200213',
): IRequestOptionsInit => {
  return {
    url: `${env.FD_API_HOST}/api/zhuzher/captcha/verify`,
    method: 'POST',
    headers: {
      'X-API-Version': xApiVersion,
    },
    data: { mobile, service, code },
  };
};
