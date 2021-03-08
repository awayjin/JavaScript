import React, { useEffect, useState } from 'react';
import styles from './index.less';

export default () => {
  const [state, setState] = useState();
  return (
    <div>
      <h1 className={styles.title}>search index</h1>
    </div>
  );
}
