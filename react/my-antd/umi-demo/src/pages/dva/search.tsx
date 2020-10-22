import React from "react";
import { SearchBar } from 'antd-mobile'

export class Search extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }

  onChange = (value: any) => {
    this.setState({ value })
  }

  onSubmit = () => {
    console.log('value', this.state.value)
    this.props.dispatch({
      type: 'search/getListAsync',
      payload: this.state.value
    })
    // this.props.dispatch({
    //   type: 'search/getList',
    //   payload: this.state.value
    // })
  }

  render() {
    return <div>
      <div>
        <SearchBar
          autoFocus
          value={this.state.value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    </div>;
  }
}

// export default Search
