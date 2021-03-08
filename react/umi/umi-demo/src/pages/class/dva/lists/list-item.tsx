import PropTypes from 'prop-types'
import React from 'react'

class ListItems extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'demo-old',
      count: 10,
      obj: {id: 1}
    }
  }

  // 配置特定的 defaultProps 属性来定义 props 的默认值
  static defaultProps = {
    name: 'default str name',
    title: 'til'
  }

  static propTypes = {
    name: PropTypes.string
  }

  
  render() {
    console.log('defaultProps', this.props)

    return (
      <>
        <div>
          { this.props.name }
            
         </div>
      </>
    );
  }
}
// ListItems.propTypes = {
//   name: PropTypes.string
// }

export default ListItems