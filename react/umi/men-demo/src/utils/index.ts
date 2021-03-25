const { hasOwnProperty } = Object.prototype;
export const hasOwn = (
  val: object,
  key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const { isArray } = Array;
export const isFunction = (val: any): val is Function =>
  typeof val === 'function';
export const isString = (val: any): val is string => typeof val === 'string';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isSymbol = (val: any): val is symbol => typeof val === 'symbol';
export const isObject = (val: any): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

export const isPlainObject = (val: any): val is object =>
  toTypeString(val) === '[object Object]';

// 处理ios 下 网页键盘顶上去页面 收起键盘后页面不下去
/**
 * ios键盘顶起页面，在blur的时候滚动一下
 */
export const scrollToView = () => {
  setTimeout(() => {
    const scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollY = Math.max(scrollHeight - 1, 0);
    window.scrollTo(0, scrollY);
  }, 100);
};
/**
 * 绑定事件，修复键盘遮挡
 */
export const bindKeyboardOcclusion = () => {
  const inputs = document.querySelectorAll('input,textarea');
  // console.log('inputs', inputs);
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('blur', scrollToView);
  }
};

/**
 * 移除 键盘遮挡事件
 */
export const removeKeyboardOcclusion = () => {
  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.removeEventListener('blur', scrollToView);
  }
};
