import React from 'react';
import { Card } from 'antd-mobile';
import {
  isAndroid,
  isiPhoneX,
  isInWechat,
  isInZhuYingTai,
  isInZhuzher,
  isIos,
  isLocal,
  isProduction,
  isStaging,
} from '@/utils/env';

export default function() {
  return (
    <Card>
      isAndroid: {isAndroid ? 'true' : 'false'}
      <br />
      isiPhoneX: {isiPhoneX ? 'true' : 'false'}
      <br />
      isInWechat: {isInWechat ? 'true' : 'false'}
      <br />
      isInZhuYingTai: {isInZhuYingTai ? 'true' : 'false'}
      <br />
      isInZhuzher: {isInZhuzher ? 'true' : 'false'}
      <br />
      isIos: {isIos ? 'true' : 'false'}
      <br />
      isLocal: {isLocal ? 'true' : 'false'}
      <br />
      isProduction: {isProduction ? 'true' : 'false'}
      <br />
      isStaging: {isStaging ? 'true' : 'false'}
      <br />
    </Card>
  );
}
