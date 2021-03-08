import React from "react";
import SearchContext from './search-context'

export default class Consumer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    // SearchContext.Consumer 函数作为子元素（function as a child）
    return <div>
      <SearchContext.Consumer>
        {
          ({state, dispatch}: any) => (
            <div>
              <h1  onClick={() => dispatch({
                type: 'TEXT',
                payload: 'consumer text'
              })}>
                consumer: { state.text }
              </h1>
              <ul>
                { state.lists.map((item: any, index: number) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          )
        }
      </SearchContext.Consumer>
    </div>;
  }
}
