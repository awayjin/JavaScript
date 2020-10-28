import React from "react";
import { connect } from 'dva'
import CreatePortal from "@/components/CreatePortal";
import { Button } from 'antd-mobile'
import Modal from "@/components/Modal";

class Dva extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    return <div>
      <div>
        <h2>CreatePortal</h2>
        <Button onClick={() => this.setState({show: true})}>Button</Button>
        <Modal
          show={this.state.show}
          onClose={() => this.setState({show: false})}
        >modal</Modal>
        {/*<CreatePortal>modal</CreatePortal>*/}
      </div>
    </div>;
  }
}

// @ts-ignore
// connect 绑定 state 到 view
export default connect(({ search }) => ({
  search
}))(Dva);
