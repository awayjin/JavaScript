import React, { FC } from 'react';
import { List, Stepper } from 'antd-mobile';
import { useModel } from 'umi';

const Counter: FC = () => {
  const { state, setNum } = useModel('testUseModel');
  return (
    <List renderHeader={() => '增加数字'}>
      <List.Item
        extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            max={10}
            min={0}
            value={state.count}
            onChange={val => {
              setNum(val);
            }}
          />
        }
      />
    </List>
  );
};

export default Counter;
