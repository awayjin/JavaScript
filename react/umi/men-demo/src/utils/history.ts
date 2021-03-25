import { history } from 'umi';
import { closeWebView } from '@/utils/jsBridge';
import { isInZhuzher } from '@/utils/env';
import { isFunction } from './index';
import { tokenOfUrl } from './url';

const myHistory = {
  entry: history.location.pathname,
};

export const setEntryPage = (path: string) => {
  myHistory.entry = path;
};

export const entryPage = () => myHistory.entry;

/**
 * 当前页是否入口页面
 */
export const isEntryPage = () =>
  history.action === 'POP' && history.location.pathname === entryPage();

/**
 * 统一返回的方法
 * 如果是入口页面
 *  1. 没有backUrl 就关闭webview
 *  2. 有backUrl 就跳转到backUrl
 * 如果传入了onBack 执行onBack
 * 否则 history.goBack()
 * @param onBack
 */
export const goBack = (onBack?: () => void) => {
  if (isFunction(onBack)) {
    return onBack();
  }

  if (isEntryPage()) {
    if (isInZhuzher) {
      const { backUrl } = tokenOfUrl(location.search);
      if (backUrl) {
        location.href = backUrl;
        return undefined;
      }
      return closeWebView();
    }
  }

  return history.goBack();
};
