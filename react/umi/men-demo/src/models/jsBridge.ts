import {
  useReduceWithModel,
  IModel,
} from '@/hooks/useReduceWithModel/useReduceWithModel';
import { useEffect, useCallback } from 'react';

import {
  getProject as jsBridgeGetProject,
  getUserBasic as jsBridgeGetUserBasic,
  getUserToken as jsBridgeGetUserToken,
  tokenBusinessType,
} from '@/utils/jsBridge';

/**
 * 通过hooks的方式获取和存放jsBridge里面的数据
 */

interface IState {
  init: {
    [p in actionEnum]: boolean; // 每个action的状态
  };
  projectCode: string;
  projectName: string;
  userToken: string;
  avatar: string; // 头像
  mobile: string; // 手机号
  name: string; // 昵称
  token: string; // falcon token
  userId: string; // falcon id //4.1.4
  role: string; // 用户身份     //4.1.4
}

const initialState: IState = {
  projectName: '', // 项目名称
  projectCode: '', // 主项目code

  userToken: '', // 获取业务token

  avatar: '', // 头像
  mobile: '', // 手机号
  name: '', // 昵称
  token: '', // falcon token
  userId: '', // falcon id //4.1.4
  role: '', // 用户身份     //4.1.4

  init: {
    getProject: false,
    getUserBasic: false,
    getUserToken: false,
  },
};

/**
 * 可以直接返回state，也可以修改draft里面的数据，返回空
 * @param draft
 * @param action
 */
enum actionEnum {
  getProject = 'getProject',
  getUserToken = 'getUserToken',
  getUserBasic = 'getUserBasic',
}

/**
 * 切换state init的状态
 * @param draft
 * @param actionType
 */
function toggleInit(draft: IState, actionType: actionEnum) {
  draft.init[actionType] = true;
}

const model: IModel<IState> = {
  immer: true,
  state: initialState,
  reducers: {
    [actionEnum.getProject](draft, { payload, type }) {
      draft.projectCode = payload.projectCode;
      draft.projectName = payload.projectName;
      draft.init.getProject = true;
      toggleInit(draft, type);
    },
    [actionEnum.getUserToken](draft, { payload, type }) {
      draft.userToken = payload.token;
      toggleInit(draft, type);
    },
    [actionEnum.getUserBasic](draft, { payload, type }) {
      toggleInit(draft, type);
      draft.avatar = payload.avatar;
      draft.mobile = payload.mobile;
      draft.name = payload.name;
      draft.token = payload.token;
      draft.userId = payload.userId;
      draft.role = payload.role;
    },
  },
};

function useJsBridge() {
  const [jsBridgeState, dispatch] = useReduceWithModel<IState, IAnyAction>(
    model,
  );

  /**
   * 获取项目信息
   */
  const getProject = useCallback(() => {
    if (!jsBridgeState.init.getProject) {
      jsBridgeGetProject(res => {
        dispatch({ type: actionEnum.getProject, payload: res.data });
      });
    }
  }, [dispatch, jsBridgeState.init.getProject]);

  /**
   * 获取app数据
   */
  const getUserBasic = useCallback(() => {
    if (!jsBridgeState.init.getUserBasic) {
      jsBridgeGetUserBasic(res =>
        dispatch({ type: actionEnum.getUserBasic, payload: res }),
      );
    }
  }, [dispatch, jsBridgeState.init.getUserBasic]);

  const getUserToken = useCallback(
    (type: tokenBusinessType = tokenBusinessType.shop) => {
      if (!jsBridgeState.init.getUserToken) {
        console.log('get otken =======');
        jsBridgeGetUserToken(type, res =>
          dispatch({ type: actionEnum.getUserToken, payload: res }),
        );
      }
    },
    [dispatch, jsBridgeState.init.getUserToken],
  );

  // 初始化所有数据
  useEffect(() => {
    if (!jsBridgeState.init.getProject) {
      console.log('init jsbridge model');
      getProject();
      getUserBasic();
      getUserToken();
    }
  }, [getProject, getUserBasic, getUserToken, jsBridgeState.init.getProject]);

  return { jsBridgeState, getProject, getUserBasic, getUserToken };
}

export default useJsBridge;
