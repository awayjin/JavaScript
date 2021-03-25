import React from 'react';
import { Button, WhiteSpace } from 'antd-mobile';

import useTick from '@/hooks/useTick';

export default function() {
  const { tick, runTick } = useTick(10);
  const { tick: tickUp, runTick: runTickUp } = useTick(1, 10);
  return (
    <>
      起始10 结束0 递减 1 tick: {tick}
      <Button
        onClick={() => {
          runTick();
        }}
      >
        run
      </Button>
      <WhiteSpace />
      起始1 结束10 递减 1 tick: {tickUp}
      <Button
        onClick={() => {
          runTickUp();
        }}
      >
        run
      </Button>
    </>
  );
}
