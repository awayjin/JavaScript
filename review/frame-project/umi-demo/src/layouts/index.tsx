import React from 'react';
import { Link } from 'umi';

export default (props: any) => {
  return (
    <>
      <div className={'global-dd'}>
        <div>
          <Link to="/">index </Link>
          <Link to="/portals">portals </Link>
          <Link to="/context">context </Link>
          <Link to="/lazy">lazy </Link>
          <Link to="/optimizing">optimizing </Link>
        </div>
      </div>
      <div style={{ padding: 20 }}>{ props.children }</div>
    </>
  )
}
