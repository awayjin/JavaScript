import React, { SFC } from 'react';
import { ActivityIndicator } from 'antd-mobile';

interface IProps {
  loading: boolean;
  text?: string;
  fallback?: JSX.Element | null;
}
const Loading: SFC<IProps> = props => {
  let { fallback } = props;
  const { loading, text } = props;

  if (!fallback) {
    fallback = <ActivityIndicator toast text={text || '加载中'} />;
  }

  return <>{loading ? fallback : null}</>;
};
export default Loading;
