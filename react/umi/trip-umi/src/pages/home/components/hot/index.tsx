import React, { useState, useEffect } from "react";
import { history } from 'umi'

export default (props: any) => {
  // const [houses, setHouses] = useState([]);
  // console.log('home props', props)
  const handleClick = (id: any) => {
    // @ts-ignore
    history.push({
      pathname: '/house',
      query: {
        id
      }
    });
  }
  return (
    <div className={'hot'}>
      <h1>最热名宿</h1>
      <div className="hot-lists">
        {props.houses?.map((item: any) => (
          <div className='hot-lists-item' key={item.id} onClick={() => handleClick(item.id)}>
            <img className='img' alt='img' src={item.img} />
            <div className='title'>{item.title}</div>
            <div className='info'>{item.info}</div>
            <div className='price'>￥{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

