import React from 'react';
import { useModel } from 'umi';
import { Button, WingBlank, WhiteSpace, Card } from 'antd-mobile';
import {
  hideTabBar,
  hideTitleBar,
  showTabBar,
  showTitleBar,
  closeWebView,
  newWebView,
  share,
} from '@/utils/jsBridge';
import { goBack } from '@/utils/history';
import NavBar from '@/components/NavBar';
import RenderCard from './components/RenderCard';

export default () => {
  const { jsBridgeState, getProject, getUserBasic, getUserToken } = useModel(
    'jsBridge',
  );

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

      <RenderCard title="jsBridge 的数据">
        {JSON.stringify(jsBridgeState, null, 4)}
      </RenderCard>

      <WhiteSpace />
      <Button
        onClick={() => {
          getProject();
        }}
      >
        getProject
      </Button>
      <WhiteSpace />
      <Button
        onClick={() => {
          getUserBasic();
        }}
      >
        getUserBasic
      </Button>
      <WhiteSpace />
      <Button
        onClick={() => {
          getUserToken();
        }}
      >
        getUserToken
      </Button>
      <WhiteSpace />
      <Button
        onClick={() => {
          hideTabBar();
        }}
      >
        hideTabBar
      </Button>

      <WhiteSpace />
      <Button
        onClick={() => {
          hideTitleBar();
        }}
      >
        hideTitleBar
      </Button>

      <WhiteSpace />
      <Button
        onClick={() => {
          showTabBar();
        }}
      >
        showTabBar
      </Button>

      <WhiteSpace />
      <Button
        onClick={() => {
          showTitleBar();
        }}
      >
        showTitleBar
      </Button>

      <WhiteSpace />
      <Button
        onClick={() => {
          closeWebView();
        }}
      >
        closeWebView
      </Button>

      <WhiteSpace />
      <Button
        onClick={() => {
          newWebView('https://www.baidu.com');
        }}
      >
        newWebView
      </Button>
    </WingBlank>
  );
};
