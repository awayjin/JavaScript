import React, { useEffect } from 'react';
import { Card, Button } from 'antd-mobile';
import { useRequest } from 'umi';
import { fetchQuestionDetail } from '@/services/test';

export default function() {
  const { data, loading, run } = useRequest(fetchQuestionDetail, {
    manual: true,
    formatResult: res => {
      return res.message;
    },
  });

  return (
    <Card>
      返回的数据：{data}
      <Card.Footer
        content={
          <Button
            onClick={() => {
              run(Number(233));
            }}
            loading={loading}
          >
            发送请求
          </Button>
        }
      />
    </Card>
  );
}
