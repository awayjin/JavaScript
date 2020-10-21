import React from "react";
import { Search } from './search'
import Lists from './lists'
import { connect } from 'dva'

class Dva extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }


  render() {
    return <div>
      <div>
        <Search {...this.props} />
        <Lists {...this.props} ></Lists>
      </div>
    </div>;
  }
}

// @ts-ignore
export default connect(({ search }) => ({
  search
}))(Dva);
// export default connect(({search})=>({
//   search
// }))(Dva)
