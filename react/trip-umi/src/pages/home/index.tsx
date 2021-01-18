import React, { useState, useEffect } from "react";
import Header from './components/header'
import Hot from './components/hot'
import Search from './components/search'
import './index.less'
// @ts-ignore
import { useHttpHook } from '@/hooks'

export default (props: any) => {
  console.log('home props', props)
  const [cities, citiesLoading] = useHttpHook({
    url: '/commons/cities'
  });
  const [houses] = useHttpHook({
    url: '/house/hot'
  })
  return (
    <div className={'home'}>
      {/**header登录 */}
      <Header></Header>
      {/**搜索 */}
      <Search cities={cities} citiesLoading={citiesLoading}></Search>
      <Hot houses={houses}></Hot>
    </div>
  )
}

