import React from 'react';
import Catch from '@/hoc/functional-error-boundary';
// import { Button } from 'antd-mobile';
import styles from './index.less';
/**
 * 包裹组件，在渲染错误的时候显示
 * <ErrorBoundary>
 *    <RError />
 * </ErrorBoundary>
 */
type Props = {
  children: React.ReactNode;
};

const ErrorBoundary = Catch((props: Props, error?: Error) => {
  if (error) {
    return (
      <div className={styles['error-screen']}>
        <h2>An error has occured</h2>
        <h4>message：{error.message}</h4>
        {/* todo 不提供刷新页面功能，可能当前错误是中间页面，需要增加一个时光机回溯 */}
        {/* <Button>刷新页面</Button> */}
      </div>
    );
  }
  return <>{props.children}</>;
});

export default ErrorBoundary;
