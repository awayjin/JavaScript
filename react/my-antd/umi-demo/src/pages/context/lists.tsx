import React from "react";
import { List } from 'antd-mobile'
import SearchContext from "./search-context";

class Lists extends React.Component<any, any> {
  static contextType = SearchContext;
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
    console.log('this', this)
    const { text, lists } = this.context.state
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
