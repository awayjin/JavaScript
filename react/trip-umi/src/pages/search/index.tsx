import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { useLocation } from 'umi'
import { SearchBar, ActivityIndicator } from 'antd-mobile'
// @ts-ignore
import { useHttpHook } from '@/hooks'
import './index.less'

export default () => {
  const { query }: any = useLocation();
  const [houseName, setHouseName] = useState('');
  const [houseLists, setHouseLists] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [houseSubmitName, setHouseSubmitName] = useState('');

  const [houses, loading] = useHttpHook({
    url: '/house/search',
    body: {}
    // body: {
    //   ...page,
    //   houseName,
    //   code: query?.code,
    //   startTime: query?.startTime + ' 00:00:00',
    //   endTime: query?.endTime + ' 23:59:59'
    // },
    // watch: [page.pageNum, houseSubmitName]
  });

  const handleChange = (value: any) => {
    console.log(value)
    setHouseName(value);
  };

  const _handleSubmit = (value: any) => {
    setHouseName(value);
    setHouseSubmitName(value);
    // setPage(CommonEnum.PAGE);
    setHouseLists([]);
  };

  const handleCancel = () => {
    _handleSubmit('');
  };

  const handleSubmit = (value: any) => {
    // console.log(value)
    _handleSubmit(value);
  };

  const searchResult = () => {
    return (
      <div className='result'>
        {houses?.map((item: any) => (
          <div className='item' key={item.id}>
            <img alt='img' className='item-img' src={item.img} data-src={item.img} />
            <div className='item-right'>
              <div className='title'>{item.title}</div>
              <div className='price'>{item.price}</div>
            </div>
          </div>
        ))}

        <div className='item' >
          <img alt='img' className='item-img' src={require('../../assets/blank.png')} data-title={33} />
          <div className='item-right'>
            <div className='title'>2</div>
            <div className='price'>3</div>
          </div>
        </div>
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
      {
        loading
          ? <ActivityIndicator toast />
          : searchResult()
      }

    </div>
  );
}
