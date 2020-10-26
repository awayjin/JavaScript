import React from "react";
import { SearchBar } from 'antd-mobile'
import SearchContext from "./search-context";

export default class Search extends React.Component<any, any> {
  static contextType = SearchContext;
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
    this.context.dispatch({
      type: 'TEXT',
      payload: this.state.value
    })
    this.context.dispatch({
      type: 'LISTS',
      payload: this.state.value
    })
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
