import React from 'react';
import styles from './index.less';
import {List} from "antd";
import {Link} from "umi";
import { useMount } from '@umijs/hooks';

const data = [
  { text: 'Racing car sprays burning fuel into crowd.', to: '/class'},
  { text: 'demo.', to: '/demo'},
];
export default () => {
  useMount(() => {
    console.log('one more time.')
  })
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Link to={item.to}>{item.text}</Link>
          </List.Item>
        )}
      >
      </List>
      <List>
        <List.Item><Link to={'/class'}>class</Link></List.Item>
        <List.Item><Link to={'/demo'}>demo</Link></List.Item>
      </List>
    </div>
  );
}
