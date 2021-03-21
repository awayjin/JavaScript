import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { useLocation } from 'umi'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
// @ts-ignore
import {
  useHttpHook,
  useObserverHook,
  useIntersectionObserverHook,
  useImgHook,
  useImagesHook,
// @ts-ignore
} from '@/hooks';
// @ts-ignore
import './index.less'
// @ts-ignore
import { ShowLoading } from '@/components';
// @ts-ign3ore3
import { CommonEnum } from '@/enums/index';


// window.scrollTo(0, 0)
export default () => {
  const { query }: any = useLocation();
  const [houseName, setHouseName] = useState('');
  const [houseSubmitName, setHouseSubmitName] = useState('');
  const [page, setPage]: any = useState({
    pageSize: 8,
    pageNum: 1
  })
  const [houseLists, setHouseLists]: any = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  // 请求
  const [houses, loading] = useHttpHook({
    url: '/house/search',
    // body: {}
    body: {
      ...page,
      houseName,
      code: query?.code,
      startTime: query?.startTime + ' 00:00:00',
      endTime: query?.endTime + ' 23:59:59'
    },
    watch: [page.pageNum, houseSubmitName]
  });

  /**
   * 1. 监听 loading 是否展示出来
   * 2. 修改分页数据
   * 3. 监听分页数据的修改，发送接口，请求下一页的数据
   * 4. 监听 loading 变化, 拼接数据
   *
   * */
  // useObserverHook('#loading-info', (entries: any) => {
  useIntersectionObserverHook(CommonEnum.LOADING_ID, (entries: any) => {
    console.log('entries:', entries)
    // if (!loading && entries[0].isIntersecting) {
    if (!loading && entries[0].isIntersecting) {
      setPage({
        ...page,
        pageNum: page.pageNum + 1
      })
    }
  }, null)

  useImagesHook('.item-img', (entries: IntersectionObserver) => {
  // useImgHook('.item-img', (entries: IntersectionObserver) => {
    console.log('entries:', entries)
  }, null)

  useEffect(() => {
    if (!loading && houses) {
      if (houses?.length) {
        setHouseLists([...houseLists, ...houses])
      } else {
        setShowLoading(false)
      }
    }
  }, [loading])


  const handleChange = (value: any) => {
    console.log(value)
    setHouseName(value);
  };

  const _handleSubmit = (value: any) => {
    setHouseName(value);
    setHouseSubmitName(value);
    // setPage(CommonEnum.PAGE);
    setPage({
      pageSize: 8,
      pageNum: 1,
    });
    setHouseLists([]);
    setShowLoading(true);
  };

  const handleCancel = () => {
    _handleSubmit('');
  };

  const handleSubmit = (value: any) => {
    console.log(value)
    _handleSubmit(value);
  };

  const searchResult = () => {
    return (
      <div className='result'>
        {houseLists?.map((item: any, index: any) => (
          <div className='item' key={index}>
            <img alt='img' className='item-img' src={require('@/assets/blank.png')} data-src={item.img} />
            <div className='item-right'>
              <div className='title'>{index + item.title}</div>
              <div className='price'>{item.price}</div>
            </div>
          </div>
        ))}
        <ShowLoading showLoading={showLoading} />
        {/*{ showLoading ? <div id="loading-change">loading...</div>: <div>没有数据了</div>}*/}
      </div>
    )
  }
  return (
    <div className={'search-page'}>
      {/**顶部搜索栏 */}
      <SearchBar
        placeholder='搜索民宿'
        value={houseName}
        onChange={handleChange}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {/**搜索结果 */}
      <div>
        {
          !houseLists.length
            ? <ActivityIndicator toast />
            : (
              searchResult()
            )
        }
      </div>

    </div>
  );
}
