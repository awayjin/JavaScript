import { useState, useEffect } from 'react';
// @ts-ignore
import { Http } from '@/utils';

export default function useHttpHook(
  {
    url = '',
    method = 'post',
    headers = '',
    body = {},
    watch = []
  }
) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Http({
      url,
      method,
      headers,
      body,
      setResult,
      setLoading
    });
  }, watch);

  return [result, loading];
}
