import React from "react";
import './index.less'
import { TabBar } from 'antd-mobile'

export default class MenuBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  render() {
    const { show } = this.props;
    return <>
      <TabBar>
        <TabBar.Item
          title={'menu-bar'}
          icon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '22px',
            height: '22px',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
          />
          }
        >
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
            />
          }
          title="Koubei"
        >

        </TabBar.Item>
      </TabBar>
    </>;
  }
}
