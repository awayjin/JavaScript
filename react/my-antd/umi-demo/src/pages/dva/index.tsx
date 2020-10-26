import React from "react";
import Search from './search'
import Lists from './lists'
import { connect } from 'dva'

class Dva extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    console.log('2 index this.props:', this.props)
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
// export default connect(({ search }) => ({
//   search
// }))(Dva);

// connect 绑定 state 到 view
const instance = connect(function (_ref: any) {
  console.log('--> 1 _ref', _ref)
  var search = _ref.search;
  return {
    search: search
  };
})(Dva);
// console.log('instance:', instance)
export default instance;
