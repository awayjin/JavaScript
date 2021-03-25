/**
 * 下面都是用来测试的接口
 */
import env from '@/utils/env';
import { IRequestOptionsInit } from './interface';

export function fetchSkipErr(): IRequestOptionsInit {
  return {
    url: '/api/fail/post/400/0/error',
    skipErrorHandler: true,
  };
}
export function fetchQuestionDetail(id: number): IRequestOptionsInit {
  return {
    url: `/emerald/api/v1/web/surveys/${id}`,
    extraRequestOptions: {
      // tokenType: 'test',
    },
  };
}

export function fetchTestMock() {
  return '/api/users';
}

export function fetchBLACKPEARLHost(): IRequestOptionsInit {
  return {
    url: `${env.BLACKPEARL_HOST}/api/users`,
    extraRequestOptions: {
      host: env.BLACKPEARL_HOST,
    },
  };
}

export function fetchFail400_0() {
  return { url: '/api/fail/post/400/0/error' };
}

export function fetchFail400_200() {
  return '/api/fail/post/400/200/error';
}

export function fetchFail400_400() {
  return '/api/fail/post/400/400/error';
}

export function fetchFail200_0() {
  return '/api/fail/post/200/0/error';
}

export function fetchFail200_200() {
  return '/api/fail/post/200/200/error';
}

export function fetchFail200_400() {
  return '/api/fail/post/200/400/error';
}
