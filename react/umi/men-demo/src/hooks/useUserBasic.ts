import { useEffect } from 'react';
import { useModel } from 'umi';

export default function useUserBasic() {
  const {
    avatar,
    mobile,
    name,
    token,
    userId,
    role,
  } = useUserBasicByJsBridge();
  return { avatar, mobile, name, token, userId, role };
}

/**
 * 从jsBridge获取UserBasic
 */
export function useUserBasicByJsBridge() {
  const { jsBridgeState, getUserBasic } = useModel('jsBridge');

  useEffect(() => {
    getUserBasic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { avatar, mobile, name, token, userId, role } = jsBridgeState;
  return { avatar, mobile, name, token, userId, role };
}
