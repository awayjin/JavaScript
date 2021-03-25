import env from '@/utils/env';
import { request } from 'umi';
import { IRequestOptionsInit } from './interface';

export function fetchOss(bucket = 'vk-fg-test'): IRequestOptionsInit {
  return `${env.FG_HOST}/flea_market/oss_ticket?bucket=${bucket}`;
}

export function requestOss(bucket = 'vk-fg-test') {
  return request(`${env.FG_HOST}/flea_market/oss_ticket?bucket=${bucket}`);
}
