import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import User from './user'
import { UserContext } from "./userContext";
import { Button } from 'antd-mobile'

export default function (props: any) {
  const {state, dispatch}: any = useContext(UserContext)
  console.log('state:', state)
  const handleLogin = () => {
    dispatch({
      type: 'LOGIN',
      payload: true
    })
  }
  return (
    <div>
      { state?.isLogin ? <User /> : <Button onClick={handleLogin}>login</Button> }
    </div>
  )
}
