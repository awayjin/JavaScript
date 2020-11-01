import React, {useCallback, useEffect, useReducer, useState} from "react";

const initState = {
  isLogin: false,
  user: {
    id: '100',
    name: 'john'
  }
}

const UserContext = React.createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: action.payload
      }
    default:
      break;
  }
}

const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserContextProvider
}
