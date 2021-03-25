import React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';

import { goBack } from '@/utils/history';
import NavBar from '@/components/NavBar';
import { share } from '@/utils/jsBridge';

import RenderCard from './components/RenderCard';
import Counter from './components/Counter';

const CounterPage = () => {
  return (
    <WingBlank size="lg">
      <NavBar
        onLeftClick={goBack}
        onShare={() => {
          share({
            title: 'test',
            link: location.href,
            platform: ['WECHAT_CHAT'],
          });
        }}
      />
      <WhiteSpace />
      <RenderCard title="全局model">
        {Array(10)
          .fill(1)
          .map((v, i) => {
            return <Counter key={i} />;
          })}
      </RenderCard>
    </WingBlank>
  );
};

export default CounterPage;
