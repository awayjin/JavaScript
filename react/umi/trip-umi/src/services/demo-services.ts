import { request } from 'umi';
import { useState} from "react";
import { useRequest } from 'ahooks';
import { Toast } from 'antd-mobile'

export const demo1 = (d = '3') => {
  const url = `/api/demo1`;
  return request(url, {
    method: 'get',
    skipErrorHandler: true,
  });
};



export const demo2 = (arg = 'default') => {
  // const url = `/api/demo2?arg=${arg}`;
  // const url = `http://localhost:3003/getUserInfo`;
  // const url = `/api/getUserInfo`;
  const url = `/api/demo2`;
  return request(url, {
    method: 'get',
    // skipErrorHandler: true,
  });
};
export const useRequestDemo2 = (arg: any) => {
  const {data, error, loading, } = useRequest(() => demo2(arg))
  // console.log('data: ', data)
  if (data?.code  === 0) {
    return [data.result, loading, error, ]
  }
  return [data, loading]
}

export const demo3 = (arg = 'default') => {
  // const url = `/api/demo2?arg=${arg}`;
  const url = `/backend/getUserInfo`;
  // const url = `/api/getUserInfo`;
  return request(url, {
    method: 'get',
    // skipErrorHandler: true,
  });
};

export const useRequestDemo3 = (arg: any) => {
  const {data, error, loading, } = useRequest(() => demo3(arg))
  console.log('data: ', data, ' error: ', error, loading)
  if (data?.code  === 0) {
    return [data.result, loading, error,]
  }

  // if (data && data?.code !== 0) {
  //   console.log('-- wrong.')
  //   Toast.info('出错了')
  //   return [data, loading]
  // }
  return [data, loading]
}
