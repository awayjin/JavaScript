import React, { useState, useEffect, useReducer } from 'react';
// import { useRequest } from 'umi'
import { useRequest } from 'ahooks';
import { Button, Toast, Icon } from 'antd-mobile';
import {
  demo1,
  demo2,
  demo3,
  useRequestDemo2,
  useRequestDemo3,
} from '@/services/demo-services';

const DemoService = () => {
  const [userId, setUserId] = useState('user-id-1')
  // const { data, error, loading, params } = useRequest(() => demo2(userId));
  // const { data: d1, error: e1, loading: l1 } = useRequest(demo1);
  // console.log('--> data:', data, loading, error, params)
  // console.log('--> d1:', d1, e1, l1)

  // const [demo2Data, demo2Loading, demo2Error] = useRequestDemo2(' 2-arg')
  // console.log('demo2Data:', demo2Data, demo2Loading, demo2Error)
  const [demo3Data, demo3Loading, demo3Error] = useRequestDemo3(userId)
  // console.log('demo3Data:', demo3Data, demo3Loading, demo3Error)

  useEffect(() => {
    // demo2('d5').then((res) => {
    //   console.log('res:', res)
    // }, err => {
    //   console.log('err:', err)
    // })
  }, [])

  return (
    <>
      <div className="prefix-content">
        333

        <button onClick={() => {
          window.fetch('http://localhost:3003/backend/getUserInfo')
            .then(res => res.json())
            .then((data) => {
              console.log('data:', data)
            }, err => {
              console.log('err2:', err)
            })
        }}>direction fetch</button>

        <button onClick={() => {
          demo1().then((res) => {
            console.log('res:', res)
          }, err => {
            console.log('err:', err)
          })
        }}>demo 1</button>

        <button onClick={() => {
          // console.log('--> data:', data, loading, error, params)
          demo2('d5').then((res) => {
            console.log('res:', res)
          }, err => {
            console.log('err:', err)
          })
        }}>demo2</button>

        <button onClick={() => {
          demo3('d5').then((res) => {
            console.log('res:', res)
          }, err => {
            console.log('err:', err)
          })
        }}>demo3</button>
      </div>
    </>
  );
};

export default DemoService;
