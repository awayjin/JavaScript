import React, { useState, useEffect, useCallback } from 'react';
import { InputItem, Button } from 'antd-mobile';
import { verifyTips, verifyType } from '@/utils/verifyTips';
import useKeyboardOcclusion from '@/hooks/useKeyboardOcclusion';

export default function() {
  // useKeyboardOcclusion();
  const [value, setValue] = useState('');

  const verify = useCallback(
    type => {
      const pass = verifyTips(value, type, true);
      console.log('校验结果:', pass);
    },
    [value],
  );

  return (
    <>
      <InputItem
        placeholder="输入内容"
        value={value}
        onChange={v => {
          setValue(v);
        }}
      />
      <Button
        onClick={() => {
          verify(verifyType.phone);
        }}
      >
        校验手机
      </Button>
      <Button
        onClick={() => {
          verify(verifyType.chineseIdCard);
        }}
      >
        校验身份证
      </Button>
    </>
  );
}
