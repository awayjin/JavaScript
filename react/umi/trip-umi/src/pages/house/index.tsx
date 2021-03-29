import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Info from './components/Info';
import Lists from './components/Lists';
import Footer from './components/Footer';
import { useStoreHook } from 'think-react-store';
// import { useObserverHook } from '@/hooks';
// import { CommonEnum } from '@/enums';
import { useLocation } from 'umi';

import './index.less';

export default function (props: any) {
  // const {
  //   house: {
  //     detail,
  //     getDetailAsync,
  //     getCommentsAsync,
  //     comments,
  //     reloadComments,
  //     reloadCommentsNum,
  //     showLoading,
  //     resetData
  //   }
  // } = useStoreHook();
  const { house:  {
    detail,
    getDetailAsync
  }} = useStoreHook()
  const { query }: any = useLocation();
  useEffect(() => {
    console.log('house:', detail)
    getDetailAsync({})
  }, [])

  /**
   * 1，监听loading是否展示出来
   * 2，出发reload，修改分页
   * 3，监听reload变化，重新请求接口
   * 4，拼装数据
   */


  return (
    <div className='house-page'>
      {/**banner */}
      <Banner banner={detail?.banner} />
      {/**房屋信息 */}
      <Info  />
      {/**评论列表 */}
      <Lists />
      {/**footer */}
      <Footer />
    </div>
  )
}
