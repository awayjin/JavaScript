export const regPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;

export const regChineseName = /^([\u4e00-\u9fa5]|[A-Za-z]|\u2022|\.){1,}$/; // 中文名称

export const regChineseIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 居民身份证

export const regHKMoIdCard = /(^[hm]\d{11}$)/i; // 港澳居民来往内地通行证

export const regTWIdCard = /^\d{8}$/; // 台湾居民来往大陆通行证

export const regAPRIdCard = /^[A-Za-z]{3}\d{12}$/; // 外国人永久居留身份证

export const regHMTliveIdCard = /^8[1-3]\d{15}[x\d]$/i;

export const regPublicResource = /^-\d{9}=/;

export const regNum = /^[0-9]*$/;

// 6位以上数字或字母
export const reg6NumOrString = /^[a-zA-Z0-9]{6,66}$/;
