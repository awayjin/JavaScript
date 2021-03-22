import React, {useState, useEffect, useCallback} from "react";
import Header from './components/header'
import Hot from './components/hot'
import Search from './components/search'
import './index.less'
// @ts-ignore
import { useHttpHook } from '@/hooks'
import {useModel} from "@@/plugin-model/useModel";

export default (props: any) => {

  const { user, signIn, signOut } = useModel('useUserModel');
  useEffect(() => {
    signIn('jw',  'pwd')
    // console.log('user', user)
  }, [])
  const momoriedCb = useCallback(() => {
    console.log('33', user)
    signOut()
  }, [user])
  // console.log('momoriedCb:', momoriedCb())

  // console.log('home props', props)
  const [cities, citiesLoading] = useHttpHook({
    url: '/commons/cities'
  });
  const [houses] = useHttpHook({
    url: '/house/hot'
  })
  return (
    <div className={'home'}>
      <button onClick={() => signIn('acc4', 'pwd4')}>sign in</button>
      <button onClick={momoriedCb}>sign out</button>
      {/**header登录 */}
      <Header></Header>
      {/**搜索 */}
      <Search cities={cities} citiesLoading={citiesLoading}></Search>
      <Hot houses={houses}></Hot>
    </div>
  )
}

