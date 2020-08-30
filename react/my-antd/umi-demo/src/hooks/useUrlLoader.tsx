import {useEffect, useState} from "react";
import { request } from 'umi'

export const useUrlLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    request(url, {
      method: 'get'
    }).then(res => {
      console.log('res', res)
      setData(res)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }, deps);

  return [data, loading]
}
