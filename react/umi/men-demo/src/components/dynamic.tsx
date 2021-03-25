import { dynamic } from 'umi';
import React from 'react';
/**
 * 按需加载组件例子
 *
 */
const delay = (timeout: number) =>
  new Promise(resolve => setTimeout(resolve, timeout));

const App = dynamic({
  async loader() {
    await delay(/* 1s */ 1000);
    return () => <div>I will render after 1s</div>;
  },
});

export default App;
