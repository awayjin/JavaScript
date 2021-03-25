import React, { useEffect } from 'react';
import { Card, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { useRequest } from 'umi';
import {
  fetchQuestionDetail,
  fetchFail400_0,
  fetchFail400_200,
  fetchSkipErr,
  fetchBLACKPEARLHost,
  // fetchFail400_400,
  // fetchFail200_0,
  // fetchFail200_200,
  // fetchFail200_400,
} from '@/services/test';

export default function() {
  const { data, run: run1, loading, error } = useRequest(fetchQuestionDetail, {
    manual: true,
    formatResult: res => {
      // console.log(res, 'res');
      return res.message;
    },
  });

  const { run: run400 } = useRequest(fetchFail400_0, {
    manual: true,
    onError: e => {
      console.log(e, 'fetchFail400_0');
    },
  });

  const { run: run400_200 } = useRequest(fetchFail400_200, {
    manual: true,
    onError: e => {
      console.log(e, 'fetchFail400_200');
    },
  });

  const { run: runfetchSkipErr } = useRequest(fetchSkipErr, {
    manual: true,
    onError: e => {
      console.log(e.data, 'fetchSkipErr');
    },
  });
  const { run: runfetchBlack } = useRequest(fetchBLACKPEARLHost, {
    manual: true,
    onError: e => {
      console.log(e.data, 'runfetchBlack');
    },
  });

  // useRequest(fetchFail400_400, {
  //   onError: e => {
  //     console.log(e, 'fetchFail400_400');
  //   },
  // });

  // // 测试业务码出错误
  // useRequest(fetchFail200_0, {
  //   onError: e => {
  //     console.log(e, 'fetchFail200_0');
  //   },
  // });
  // useRequest(fetchFail200_200, {
  //   onError: e => {
  //     console.log(e, 'fetchFail200_200');
  //   },
  // });
  // useRequest(fetchFail200_400, {
  //   onError: e => {
  //     console.log(e, 'fetchFail200_400');
  //   },
  // });

  return (
    <Card>
      <WhiteSpace />
      <WingBlank>返回的数据：{data}</WingBlank>
      <WhiteSpace />
      <Card.Footer
        content={
          <>
            <Button
              onClick={() => {
                run1(Number(233));
              }}
            >
              正常请求
            </Button>
            <WhiteSpace />
            <Button
              onClick={() => {
                run400();
              }}
            >
              400_0请求
            </Button>
            <WhiteSpace />

            <Button
              onClick={() => {
                run400_200();
              }}
            >
              400_200请求
            </Button>
            <WhiteSpace />
            <Button
              onClick={() => {
                runfetchSkipErr();
              }}
            >
              自行处理错误
            </Button>
            <WhiteSpace />
            <Button
              onClick={() => {
                runfetchBlack();
              }}
            >
              请求友邻接口
            </Button>
            <WhiteSpace />
          </>
        }
      />
    </Card>
  );
}
