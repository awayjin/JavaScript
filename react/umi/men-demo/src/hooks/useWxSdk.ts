import { useEffect, useState } from 'react';
import { loadWxSdk, wxReady } from '@/utils/wxsdk';

/**
 * wx sdk 是否ready
 */
export default function useWxSdk() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (wxReady()) {
      setReady(true);
    } else {
      loadWxSdk(() => {
        setReady(true);
      });
    }
  }, []);

  return [ready];
}
