import { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { fetchSendCode, fetchVerySms } from '@/services/mobileCode';
import useTick from '@/hooks/useTick';
import { verifyTips, verifyType } from '@/utils/verifyTips';

/**
 * 获取手机验证码以及验证的逻辑
 *
 * @params beginTick 计时器初始值
 * @params endTick 计时器结束值
 * 手机验证码逻辑
 * @returns fetchCode 获取验证码方法
 * @returns verifyCode 校验手机号和验证码
 * @returns verifyCodeLoading
 * @returns fetchCodeLoading
 * @returns tick 获取验证码方法 间隔
 * @returns pass 校验手机号和验证码是否成功
 * @returns canSend 是否能发送验证码
 */
function useMobileVerify(beginTick = 60, endTick = 0) {
  const [pass, setPass] = useState(false);
  const { tick, runTick } = useTick(beginTick, endTick);
  const [canSend, setCanSend] = useState(true); // 计时是否允许提交

  useEffect(() => {
    if (tick === beginTick) {
      setCanSend(true);
    } else {
      setCanSend(false);
    }
  }, [beginTick, tick]);

  const { run: runSendCode, loading: fetchCodeLoading } = useRequest(
    fetchSendCode,
    {
      manual: true,
      debounceInterval: 300,
      formatResult: res => res,
      onSuccess: (data, params) => {
        runTick();
      },
    },
  );

  const fetchCode = (mobile: string) => {
    if (canSend) {
      if (verifyTips(mobile, verifyType.phone)) {
        runSendCode(mobile);
      }
    }
  };

  const { run: runVerySms, loading: verifyCodeLoading } = useRequest(
    fetchVerySms,
    {
      manual: true,
      debounceInterval: 300,
      onSuccess: (data, params) => {
        setPass(true);
      },
    },
  );

  return {
    fetchCode,
    verifyCode: runVerySms,
    verifyCodeLoading,
    fetchCodeLoading,
    tick,
    pass,
    canSend,
  };
}

export default useMobileVerify;
