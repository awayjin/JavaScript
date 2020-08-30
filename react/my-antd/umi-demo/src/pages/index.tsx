import React, {SyntheticEvent} from 'react';
import styles from './index.less';
import {useMousePosition} from "@/hooks/useMousePosition";
import {history} from "@@/core/history";

export default () => {
  const position = useMousePosition();
  // const unlisten = history.listen((location: { pathname: any; }, action: any) => {
  //   console.log('--> 1.location', location);
  //   // unlisten();
  // });
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={() => {
        history.push({
          pathname: '/useRef',
          search: '?b=bb',
          // 一些不存在url参数上面的当前url的状态值
          state: { a: '1. state' }
        })
      }}>go to useRef</button>
      <p>x: { position.x}, y: { position.y}</p>
      <Demo onClick={(e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('demo clicked', e)
      }} >demo ya</Demo>
    </div>
  );
}


class Demo extends React.Component<any, any> {
  componentDidMount() {
    console.log('11')
  }
  render() {
    return (
      <div >
        <button {...this.props}></button>
      </div>
    )
  }
}
