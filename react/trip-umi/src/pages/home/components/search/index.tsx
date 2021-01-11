import React, { useState, useEffect } from "react";
import { Picker, List, Calendar, Button, Toast } from 'antd-mobile';

export default (props: any) => {
  const [state, setState] = useState();
  const [citys, setCitys] = useState([
    [{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }]
  ]);
  const [selectedCity, setSelectedCity] = useState(['10001']);
  console.log('home props', props)

  const handleCityChange = (value: any) => {
    setSelectedCity(value);
  };

  return (
    <div>
      {/**可选城市 */}
      <div className='search-addr'>
        {<Picker
          title='城市'
          data={citys}
          value={selectedCity}
          cascade={false}
          cols={1}
          onChange={handleCityChange}
        >
          <List.Item>可选城市</List.Item>
        </Picker>}
      </div>
      {/**可选时间 */}
    </div>
  )
}

