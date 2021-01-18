import React, { useState, useEffect } from "react";
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';
import dayjs from 'dayjs'
import { history } from 'umi'

export default (props: any) => {
  const [state, setState] = useState();
  const [dateShow, setDateShow] = useState(false);
  const [times, setTimes] = useState('可选时间');
  const [citys, setCitys] = useState([
    [{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }]
  ]);
  const [selectedCity, setSelectedCity] = useState(['10001']);
  // console.log('home props', props)

  const handleCityChange = (value: any) => {
    setSelectedCity(value);
  };

  const handleDate = () => {
    setDateShow(!dateShow)
  }

  const handleDateConfirm = (startTime: any, endTime: any) => {
    console.log('startTime:', startTime, endTime)
    handleDate()
    setTimes(dayjs(startTime).format('YYYY-MM-DD') + '~' + dayjs(endTime).format('YYYY-MM-DD'))
  }

  const handleClick = () => {
    if (times.includes('~')) {
      history.push({
        pathname: '/search',
        query: {
          code: selectedCity,
          startTime: times.split('~')[0],
          endTime: times.split('~')[1]
        }
      })
    } else {
      Toast.fail('请选择时间')
    }

  }

  return (
    <div>
      {/**可选城市 */}
      <div className='search-addr'>
        {!props.citiesLoading && <Picker
          title='城市'
          data={props.cities}
          value={selectedCity}
          cascade={false}
          cols={1}
          onChange={handleCityChange}
        >
          <List.Item>可选城市</List.Item>
        </Picker>}
      </div>
      {/**可选时间 */}
      <div className="search-time" onClick={handleDate}>
        <div className="search-time-left">出租时间</div>
        <div className="search-time-right">{times}</div>
      </div>
      {/**点击按钮 */}
      <Button type={'warning'} size={'large'} onClick={handleClick}>搜索名宿</Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={handleDateConfirm}
      />
    </div>
  )
}

