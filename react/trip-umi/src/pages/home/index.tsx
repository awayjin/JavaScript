import React, { useState, useEffect } from "react";
import Header from './components/header'
import Hot from './components/hot'
import Search from './components/search'
import './index.less'

export default (props: any) => {
  console.log('home props', props)
  return (
    <div className={'home'}>
      <Header></Header>
      <Hot></Hot>
      <Search></Search>
    </div>
  )
}

