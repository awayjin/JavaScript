import React, { useState, useEffect } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { verifyTips, verifyType } from '@/utils/verifyTips';
import useMobileVerify from '@/hooks/useMobileVerify';

export default function() {
  const [mobile, setMobile] = useState('13510130476');
  const [code, setCoce] = useState('');
  const {
    pass,
    verifyCodeLoading,
    fetchCodeLoading,
    fetchCode,
    verifyCode,
    tick,
    canSend,
  } = useMobileVerify();

  return (
    <>
      验证码是否正确：{pass ? '验证通过' : '验证失败'}
      <InputItem
        value={mobile}
        placeholder="手机号"
        onChange={v => {
          const p = verifyTips(v, verifyType.phone, true);
          console.log('校验结果:', p);
          setMobile(v);
        }}
      />
      <Button
        disabled={!canSend}
        loading={fetchCodeLoading}
        onClick={() => {
          fetchCode(mobile);
        }}
      >
        发送验证码{tick}
      </Button>
      <InputItem
        value={code}
        placeholder="输入验证码"
        onChange={v => {
          setCoce(v);
        }}
      />
      <Button
        onClick={() => {
          verifyCode(mobile, code)
            .then(res => {
              console.log(res);
            })
            .catch(e => {
              console.log('err:', e);
            });
        }}
        loading={verifyCodeLoading}
      >
        校验验证码
      </Button>
    </>
  );
}
