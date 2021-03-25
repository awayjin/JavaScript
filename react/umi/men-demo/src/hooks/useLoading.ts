import { Toast } from 'antd-mobile';
import { useEffect } from 'react';

export default function useLoading(loading: boolean, tips = '加载中...') {
  useEffect(() => {
    if (loading) {
      Toast.loading(tips, 0);
    } else {
      Toast.hide();
    }
    return () => {
      Toast.hide();
    };
  }, [loading, tips]);
}
