import React, { useState, useEffect } from "react";
import { Link } from 'umi'

export default (props: any) => {
  const [state, setState] = useState();
  return (
    <div className={'header'}>
      <div className="header-title">
        名宿
      </div>
      <div className="header-login">
        <Link to={'/login'}>登录</Link> |
        <Link to={'/register'}>注册</Link>
      </div>
    </div>
  )
}

