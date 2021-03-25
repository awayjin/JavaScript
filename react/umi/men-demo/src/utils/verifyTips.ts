import { debounce } from 'lodash';
import { Toast } from 'antd-mobile';
import {
  regPhone,
  regNum,
  regChineseIdCard,
  regHKMoIdCard,
  regTWIdCard,
  regAPRIdCard,
} from './regexp';

/**
 * 不限制
 * 整数
 * 手机
 * 居民身份证
 * 日期
 * 固定选项
 * 港澳居民来往内地通行证
 * 台湾居民来往大陆通行证
 * 外国人永久居留身份证
 */
export enum verifyType {
  any = 1,
  number = 2,
  phone = 3,
  chineseIdCard = 4,
  date = 5,
  select = 6,
  HKMoIdCard = 7,
  TWIdCard = 8,
  APRIdCard = 9,
}
/**
 * 返回 verifyType的校验错误信息
 * @param {verifyType} type
 */
export const getVerifyObjct = (type: verifyType) => {
  const msg = {
    [verifyType.any]: {
      reg: /.{0,}/i,
      errMsg: '',
    },
    [verifyType.select]: {
      reg: /.{0,}/i,
      errMsg: '',
    },
    [verifyType.number]: {
      reg: regNum,
      errMsg: '请输入正确的整数（如：123456）',
    },
    [verifyType.phone]: {
      reg: regPhone,
      errMsg: '请输入正确的手机号码',
    },
    [verifyType.chineseIdCard]: {
      reg: regChineseIdCard,
      errMsg: '请输入正确的证件号码',
    },
    [verifyType.date]: {
      reg: /.{0,}/i,
      errMsg: '请选择日期',
    },
    [verifyType.HKMoIdCard]: {
      reg: regHKMoIdCard,
      errMsg: '请输入正确的证件号码',
    },
    [verifyType.TWIdCard]: {
      reg: regTWIdCard,
      errMsg: '请输入正确的证件号码',
    },
    [verifyType.APRIdCard]: {
      reg: regAPRIdCard,
      errMsg: '请输入正确的证件号码',
    },
  };
  return msg[type];
};

/**
 * 立刻弹出toast
 */
export const showTypeErrMsgImmediately = (type: verifyType) => {
  const msg = getVerifyObjct(type).errMsg;
  if (msg) {
    Toast.fail(msg);
  }
};

/**
 * 加入debounce 弹出toast
 */
export const showverifyTypeErrMsg = debounce((type: verifyType) => {
  showTypeErrMsgImmediately(type);
}, 1000);

/**
 * 校验verifyType的值
 * @param {*} value
 * @param {verifyType} type
 */
export const verifyTips = (value: any, type: verifyType, showToast = true) => {
  const verifyObjct = getVerifyObjct(type);
  const pass = verifyObjct.reg.test(value);
  if (showToast && !pass) {
    showverifyTypeErrMsg(type);
  } else {
    showverifyTypeErrMsg.cancel();
  }
  return pass;
};

/**
 * 校验verifyType的值
 * @param {*} value
 * @param {verifyType} type
 */
export const verifyTipsImmediately = (
  value: any,
  type: verifyType,
  showToast = true,
) => {
  const verifyObjct = getVerifyObjct(type);
  const pass = verifyObjct.reg.test(value);
  if (showToast && !pass) {
    showverifyTypeErrMsg(type);
  }
  return pass;
};
