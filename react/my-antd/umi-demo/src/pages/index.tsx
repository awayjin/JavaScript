import React from 'react';
import styles from './index.less';
import {useMousePosition} from "@/hooks/useMousePosition";

export default () => {
  const position = useMousePosition();
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <p>x: { position.x}, y: { position.y}</p>
    </div>
  );
}
