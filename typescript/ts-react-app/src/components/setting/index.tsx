import React, { useContext } from 'react';
import { Checkbox , Button } from 'antd';
import { ThemeContext } from '../App'

import './index.css';

const Setting = () => {
  const theme = useContext(ThemeContext);
    return (
        <>  
            <Checkbox >新员工入职邮件提醒</Checkbox>
          <button style={theme}>button</button>
            <div className="buttonWrap">
                <Button type="primary">保存</Button>
            </div>
        </>
    )
}

export default Setting;
