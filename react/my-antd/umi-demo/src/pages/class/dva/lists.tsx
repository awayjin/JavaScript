import React from "react";
import { List } from 'antd-mobile'

class Lists extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentDidMount() {
    console.log('3. this.props:', this.props)
  }

  render() {
    const { text, lists } = this.props.search
    return <div>
      <div>
        <h1>text: { text }</h1>
        <List>
          {
            lists.map((item: any, index: any) => (
              <List.Item key={index}>{ item }</List.Item>
            ))
          }
        </List>
      </div>
    </div>;
  }
}

export default Lists
