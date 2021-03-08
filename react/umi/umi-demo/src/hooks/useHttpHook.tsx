import {useEffect, useLayoutEffect, useState} from "react";
import { Toast } from 'antd-mobile'

interface IHttp {
  url: string;
  method: string;
  headers?: object;
  body?: object;
  watch?: any;
}

export default function useHttpHook({
  url,
  method = 'POST',
  headers,
  body = {},
  watch = []
}: IHttp){
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true)

  async function Http() {
    setLoading(true)

    let params: any
    let defaultHeader = {
      'content-type': 'application/json'
    }
    if (method.toUpperCase() === 'GET') {
      params = void 0
    } else {
      params = {
        headers: {
          ...defaultHeader,
          headers
        },
        method,
        body: JSON.stringify(body)
      }
    }

    return new Promise((resolve, reject) => {
      fetch('/api' + url, params)
        .then(res => res.json())
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
            setResult(res.data)
          } else {
            Toast.fail(res.errMsg)
            reject(res.errMsg)
          }
        })
        .catch(err => {
          Toast.fail(err)
          reject(err)
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  useEffect(() => {
    Http()
  }, watch)

  return [result, loading]
}

