import React from 'react';
// import Loading from '@/components/Loading';
import { ActivityIndicator } from 'antd-mobile';

export default () => {
  return (
    <div>
      <ActivityIndicator toast text="正在加载" />
    </div>
  );
};
