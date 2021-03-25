// global shareTimeline, shareAppMessage

import { useEffect } from 'react';
import { isInWechat } from '@/utils/env';

interface IConfig {
  title: string;
  desc: string;
  imgUrl: string;
  link: string;
}

const useShare = (cfg: IConfig) => {
  useEffect(() => {
    if (!isInWechat) {
      return;
    }
    if (!cfg.title || !cfg.link || !cfg.imgUrl) {
      return;
    }
    const script = document.createElement('script');
    script.onload = () => {
      (window as any).shareTimeline(cfg);
      (window as any).shareAppMessage(cfg);
    };

    script.src =
      'https://blackpearl.4009515151.com/interfaces/share/wechat/jssdk';
    document.body.appendChild(script);
  }, [cfg]);
};

export default useShare;
