import { useEffect } from 'react';
import { bindKeyboardOcclusion, removeKeyboardOcclusion } from '@/utils/index';

// 处理ios 下 网页键盘顶上去页面 收起键盘后页面不下去
export default function useKeyboardOcclusion() {
  useEffect(() => {
    bindKeyboardOcclusion();
    return () => {
      removeKeyboardOcclusion();
    };
  }, []);
}
