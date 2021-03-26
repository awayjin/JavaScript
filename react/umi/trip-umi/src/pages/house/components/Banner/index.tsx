import React, { useState, useEffect } from 'react';
import AwesomeSwiper from 'react-awesome-swiper';

export default function (props: any) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [config, setConfig] = useState({
    loop: true,
    autoplay: {
      delay: 1500
    },
    pagination: {
      el: '.swiper-pagination'
    }
  })

  useEffect(() => {

  }, [])

  return (
    <>
      <AwesomeSwiper className='banner3'  config={config}>
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg'} alt=""/>
          </div>
          <div className="swiper-slide">
            <img src={'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg'} alt=""/>
          </div>
          <div className="swiper-slide">
            <img src={'http://img3.mukewang.com/szimg/5d1032ab08719e0906000338-360-202.jpg'} alt=""/>
          </div>
        </div>
        <div className='swiper-pagination'></div>
      </AwesomeSwiper>
    </>

  )
}


