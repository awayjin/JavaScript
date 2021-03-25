import React, { FC } from 'react';
// import Loading from '@/components/Loading';
import { ActivityIndicator } from 'antd-mobile';

/**
 * 用于包裹组件，组件loading没完成之前就显示loading，完成了再显示内容
 */
interface IProps {
  loading: boolean;
  fallback?: JSX.Element | null;
}
const LoadingWrapper: FC<IProps> = props => {
  const { loading, fallback = <ActivityIndicator toast />, children } = props;
  return <>{loading ? fallback : children}</>;
};
export default LoadingWrapper;
