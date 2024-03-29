import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import { CommonEnum } from '@/enums';
import './index.less';

export default function ShowLoading(props: any) {
  const [state, setState] = useState()

  useEffect(() => {

  }, [])

  return (
    <div>
      {
        props.showLoading ? (
          <div id={CommonEnum.LOADING_ID} className='loading-info'>loading...</div>
       ) : (
          <div className='loading-info'>没有数据了~</div>
        )
      }
    </div>
  )
}

ShowLoading.defaultProps = {
  showLoading: true,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool
};
