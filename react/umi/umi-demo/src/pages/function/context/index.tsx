import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { connect } from 'dva'
import {UserContext, UserContextProvider} from './userContext'
import App from './app'
import User from "@/pages/function/context/user";
import {Button} from "antd-mobile";

// 在某些场景下，useReducer 会比 useState 更适用，
// 例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state
export function Dva(props: any) {
  return <>
    <h2>useContext</h2>
    <UserContextProvider>
      <App {...props} />
    </UserContextProvider>
  </>
}

export default connect(({ search }: any) => ({
  search
}))(Dva);

