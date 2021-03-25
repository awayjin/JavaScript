import React, { useEffect } from 'react';
import { history, useRequest } from 'umi';

export default function useTestRequestLoading() {
  const { run } = useRequest(
    () => ({
      url: '/api/changeUsername',
      method: 'post',
      loading: true,
    }),
    {
      manual: true,
    },
  );

  useRequest(() => ({
    url: '/api/changeUsername',
    method: 'post',
    loading: true,
  }));

  useRequest(() => ({
    url: '/api/changeUsername',
    method: 'post',
    loading: true,
  }));

  useEffect(() => {
    setTimeout(() => {
      console.log('发送第三个请求');
      run();
    }, 2000);
  }, [run]);
}
