import { IService } from '@/services/interface.d';
import { proxyEnum } from '@/utils/proxyEnum';
/**
 *  fetchList  begin
 */
export enum payTypeEnum {
  pay1 = 1,
  pay2 = 2,
}
export interface IListResult {
  available_invoice_list: IAvailableInvoiceList[];
  page: number;
  total_pages: number;
}

export interface IAvailableInvoiceList {
  operate_type: string;
  pay_num: string;
  available_amt: number;
  pay_type: number;
  non_invoice_msg: string;
  pay_time: string;
  total_amt: number;
}

/**
 * 获取首页列表
 * @param page
 * @param payType
 */
export interface IFetchListParms {
  page: number;
  payType: payTypeEnum;
}
export const fetchList: IService = (prams: IFetchListParms) => {
  return {
    url: `/nf/v1/invoice/not_invoiced_list?page=${prams.page}&pay_type=${prams.payType}`,
    extraRequestOptions: {
      proxy: proxyEnum.fd,
    },
  };
};

/**
 * fetList end
 */

/**
 * 获取发票详情
 * @param page
 * @param payNum
 */
export interface IFetchDetailParams {
  page: number;
  pay_num: string;
}
export function fetchDetail({ page, pay_num }: IFetchDetailParams) {
  return {
    url: '/nf/v1/invoice/not_invoiced_detail',
    method: 'post',
    data: { page, pay_num },
  };
}

/**
 * 获取企业抬头列表
 * @param pay_num
 */
export interface IFetchRelationParms {
  pay_num: string;
}

export function fetchRelation({ pay_num }: IFetchDetailParams) {
  return {
    url: '/nf/v1/invoice/relation',
    method: 'post',
    data: { pay_num },
  };
}

/**
 * 可开票记录关联查询接口
 */
export function fetchPurchaser() {
  return {
    url: '/nf/v1/invoice/purchaser',
    method: 'post',
  };
}

/**
 * 创建发票
 * @param pay_num
 */
export interface ISubmitParms {
  custcre_email?: string;
  custcre_name: string;
  custcre_type: number;
  pay_num: string;
}

export function submit({
  custcre_email,
  custcre_name,
  custcre_type,
  pay_num,
}: ISubmitParms) {
  return {
    url: '/nf/v1/invoice/submit',
    method: 'post',
    data: { pay_num, custcre_email, custcre_name, custcre_type },
  };
}
