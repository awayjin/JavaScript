import React, {createContext, useState, useContext} from 'react';
import SearchContext from "./search-context";
import Search from './search'
import Lists from './lists'
import { getList } from '@/services/search'
import SearchConsumer from './consumer'

export default class Context extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'context 1',
      lists: [33, 44]
    }
  }

  handleDispatch = async (action: any) => {
    switch (action.type) {
      case 'TEXT':
        return this.setState({
          text: action.payload
        })
      case 'LISTS':
        const res = await getList(action.payload)
        // console.log('res:', res)
        // console.log('action:', action)
        return this.setState({
          lists: res.lists
        })
      default:
        break;
    }
  }

  render() {
    const searchContextFunc = ()=> {
      return (
        <SearchContext.Provider value={{
          state: this.state,
          dispatch: this.handleDispatch
        }}>
          <Search />
          <Lists />
          <SearchConsumer />
        </SearchContext.Provider>
      )
    }
    return <div>
      {/*{ house.info.id }*/}
      <button onClick={() => house.info }>btn</button>
      <h2>Context </h2>
      { searchContextFunc() }
    </div>;
  }
}
