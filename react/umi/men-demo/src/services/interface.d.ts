import { RequestOptionsInit } from 'umi-request';
import { proxyEnum } from '@/utils/proxyEnum';

type IUrl = string;
/**
 * 请求参数
 */
export type IRequestOptionsInit =
  | ({
      url: string;
      skipErrorHandler?: boolean; // 是否跳过统一处理错误, umi request 定义的
      extraRequestOptions?: IExtraRequestOptions; // 我们自定义的额外数据
    } & RequestOptionsInit)
  | IUrl;

export interface IExtraRequestOptions {
  tokenType?: string; // 需要添加在header的token 类型, 具体看 src/utils/token.ts
  host?: string; // 真实请求的host， 默认是env.FD_API_HOST
  proxy?: proxyEnum; // 代理host
}

export type IService = (...args: any[]) => IRequestOptionsInit;
