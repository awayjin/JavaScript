import React from 'react';
import { observer, inject } from 'mobx-react'

@inject('StyleStore', 'UserStore')
@observer
class Son extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeColor = this.handleChangeColor.bind(this)
  }
  componentDidMount() {
    this.props.UserStore.fetchUserInfo()
  }
  handleChangeColor() {
    const { StyleStore } = this.props;
    let color = 'red'
    if (StyleStore.color === 'red') {
      color = 'green'
    }
    console.log('this.props 2:', this.props);
    StyleStore.changeColor(color)
  }
  render () {
    const { StyleStore, UserStore } = this.props
    console.log('this.props:', this.props);
    return (
      <div>
        <h2 style={{ 'color': StyleStore.color}}>son</h2>
        <button onClick={this.handleChangeColor}>change color</button>
        <hr/>
        <ul>
          {
            UserStore.user && UserStore.user.map((item, index) => {
              return <li key={index}>{item.name}, {item.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Son;