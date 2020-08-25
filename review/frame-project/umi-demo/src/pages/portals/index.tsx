import React from 'react';
import styles from './index.less';
import ReactDOM from 'react-dom';

const rootModal: any = document.getElementById('root-modal')
const body: any = document.body
function PortalsDemo(props: any) {
  return ReactDOM.createPortal(
    <div>{props.children}</div>,
    rootModal,
    // document.body,
    // body,
  )
  // 使用 Portals 渲染到 body 上。
  // fixed 元素要放在 body 上，有更好的浏览器兼容性。
  // return ReactDOM.createPortal(
  //   <div className="modal">{props.children}</div>,
  //   document.body // DOM 节点
  // )
}

export default (props: any) => {
  return (
    <>
      <div>
        <PortalsDemo>
          <h3 className={styles.title}>Modal Modal content</h3>
          44
        </PortalsDemo>
      </div>
      <PortalsDemo>Modal content</PortalsDemo>
    </>
  );
}
