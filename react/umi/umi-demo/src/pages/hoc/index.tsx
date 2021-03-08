import React, {useEffect, useState} from 'react';
import { useUrlLoader } from '@/hooks/useUrlLoader'
import styles from '../index.less'

interface IShowResult {
  message: string;
  status: string;
}

export default () => {
  const url = `https://dog.ceo/api/breeds/image/random`;
  const [show, setShow] = useState(false);
  const [data, loading] = useUrlLoader(url, [show])
  const dogResult = data as IShowResult;

  return (
    <div>
      <h2 className={styles.title}>
        自定义钩子
        higher order component.
      </h2>

      <div>
        <h3>
          <button onClick={() => setShow(!show)}>toggle img</button>
        </h3>
        {
          loading ? <p>dog 读取中....</p> :
            <img src={dogResult && dogResult.message} alt=""/>
        }
      </div>
    </div>
  );
}
