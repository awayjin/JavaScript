import React, {useEffect, useState} from 'react';
import styles from './index.less';
import { useMousePosition} from '@/hooks/useMousePosition'
import Index from '../index'

export default () => {
  // const [position, setPosition] = useState({ x: 0, y: 0});
  // useEffect(() => {
  //   console.log('add', position.x)
  //   const mouseEvent = (e: MouseEvent) => {
  //     console.log('inner:', position);
  //     setPosition({x: e.clientX, y: e.clientY});
  //   }
  //   document.addEventListener('click', mouseEvent)
  //   return () => {
  //     console.log('remove', position.x)
  //     document.removeEventListener('click', mouseEvent)
  //   }
  // });
  const position = useMousePosition();
  console.log('before render', position.x);

  return (
    <div>
      <Index />
      <h1 className={styles.title}>自定义hook, 把组件逻辑提取到可重用的函数中</h1>
      <p>x: { position.x}, y: { position.y}</p>

    </div>
  );
}
