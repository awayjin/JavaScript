import React from "react";
import './index.less'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { SmileTwoTone, HomeOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { history } from 'umi'
import './index.less';

export default class MenuBar extends React.Component<any, any> {
  static defaultProps: {};
  static propTypes: {};
  constructor(props: any) {
    super(props);
    this.state = {
      items: [
        {
          title: '首页',
          icon: <HomeOutlined twoToneColor="#eb2f96" />,
          selectedIcon: <HomeOutlined />,
          link: '/'
        },
        {
          title: '订单',
          icon: <SmileTwoTone twoToneColor="#eb2f96" />,
          selectedIcon: <SmileTwoTone />,
          link: '/orders'
        },
        {
          title: '我的',
          icon: <CheckCircleTwoTone twoToneColor="#eb2f96" />,
          selectedIcon: <CheckCircleTwoTone />,
          link: '/users'
        }
      ]
    }
  }

  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  render() {
    const { show, pathname } = this.props;
    return <>
      <TabBar hidden={!show}>
        {
          this.state.items.map((item: any, index: number) => {
            return (
              <TabBar.Item
                key={item.link}
                title={item.title}
                icon={item.icon}
                selectedIcon={item.selectedIcon}
                selected={pathname === item.link }
                onPress={() => history.push(item.link)}
              />
            )
          })
        }
      </TabBar>
    </>;
  }
}

MenuBar.defaultProps = {
  show: false,
  pathname: ''
}

MenuBar.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string
}
