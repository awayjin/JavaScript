import React, { FC } from 'react';
import { Button } from 'antd-mobile';
import { useBoolean } from 'ahooks';

const RError: FC = () => {
  const [state, { toggle }] = useBoolean(false);

  if (state) {
    throw new Error('I crashed!');
  }

  return <Button onClick={() => toggle()}>触发渲染错误</Button>;
};

export default RError;
