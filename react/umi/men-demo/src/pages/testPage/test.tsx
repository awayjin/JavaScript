import React from 'react';
import { history, useModel } from 'umi';
import { Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import PickAndUploadImg from '@/components/PickAndUploadImg';
import ErrorBoundary from '@/components/ErrorBoundary';
import { goBack } from '@/utils/history';
import NavBar from '@/components/NavBar';
import { share } from '@/utils/jsBridge';
import env from '@/utils/env';
import ImagePick from './components/ImagePick';
import RError from './components/RenderError';
import RequestDemo from './components/Request';
import RenderCard from './components/RenderCard';
import Counter from './components/Counter';
import MobileVerify from './components/MobileVerify';
import useTestRequestLoading from './hooks/useTestRequestLoading';
import RegVerify from './components/RegVerify';
import Tick from './components/Tick';
import FailRequest from './components/FailRequest';
import Platform from './components/Platform';
import styles from './index.less';
import ImageCompress from './components/ImageCompress';

const triggerError = () => {
  throw new Error(
    `it is version ${env.APP_ENV}-${env.APP_VERSION_TIME}-${env.APP_VERSION} error`,
  );
};

const Test = () => {
  // useTestRequestLoading();

  const { jsBridgeState } = useModel('jsBridge')
  console.log('jsBridgeState:', jsBridgeState);
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
      <RenderCard title="测试路由">
        <Button onClick={() => history.push('/test/bridge')}>
          jsBridge页面
        </Button>
        <WhiteSpace />
        <Button onClick={() => history.push('/test/styles')}>
          styles 页面
        </Button>
      </RenderCard>

      <RenderCard title="测试请求">
        <RequestDemo />
      </RenderCard>

      <RenderCard title="测试选择上传图片">
        <PickAndUploadImg
          useCheck={false}
          useCompress={false}
          checkOptions={{
            width: 100,
          }}
          uploadSuccess={imgUrl => {
            Toast.info(`上传成功，地址：${imgUrl}`);
            console.log(imgUrl);
          }}
          onChange={data => {
            Toast.info(`图片数量：${data.length}`);
          }}
          maxCount={6}
          multiple
        />
      </RenderCard>

      <RenderCard title="测试选择图片">
        <ErrorBoundary>
          <ImagePick />
        </ErrorBoundary>
      </RenderCard>

      <RenderCard title="测试压缩图片">
        <ErrorBoundary>
          <ImageCompress />
        </ErrorBoundary>
      </RenderCard>

      <RenderCard title="测试渲染错误">
        <ErrorBoundary>
          <RError />
        </ErrorBoundary>
      </RenderCard>

      <RenderCard title="测试sentry">
        <ErrorBoundary>
          <Button onClick={() => triggerError()}>抛错</Button>
        </ErrorBoundary>
      </RenderCard>

      <RenderCard title="全局model">
        <Counter />
        <WhiteSpace />
        <Button onClick={() => history.push('/test/counter')}>
          counter页面
        </Button>
      </RenderCard>

      <RenderCard title="测试渲染错误">
        <ErrorBoundary>
          <RError />
        </ErrorBoundary>
      </RenderCard>

      <RenderCard title="测试正则提示">
        <RegVerify />
      </RenderCard>

      <RenderCard title="测试定时器hook">
        <Tick />
      </RenderCard>

      <RenderCard title="测试验证手机号hook">
        <MobileVerify />
      </RenderCard>

      <RenderCard title="测试请求错误处理">
        <FailRequest />
      </RenderCard>

      <RenderCard title="测试环境判断">
        <Platform />
      </RenderCard>

      <RenderCard title="测试mixin less">
        <div className={styles.px1}>1px all</div>
        <WhiteSpace />
        <div className={styles.pxRemove}>default 1px pxRemove</div>
        <WhiteSpace />
        <div className={styles.ellipsis}>ellipsisellipsisellipsisellipsis</div>
        <WhiteSpace />
        <div className={styles.background}>background</div>
      </RenderCard>
    </WingBlank>
  );
};

export default Test;
