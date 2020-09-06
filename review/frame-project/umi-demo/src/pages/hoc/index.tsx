import React, {createContext, useState, useContext, Suspense} from 'react';
import HocDemoClass from './withMouse'
import { CommentList } from './CommentList'

export default () => {
  return (
    <div>
      <h2>HOC</h2>
      <HocDemoClass a={44} onClick={() => console.log('click')} />
      <CommentList />
      <Demo ></Demo>
    </div>
  )
};

class Demo extends React.Component<any, any> {
  render () {
    return (
      <div>demo</div>
    )
  }
}

const DataSource = {
  getComments () {
    return [
      { comment: 'comment 1', id: 1 },
      { comment: 'comment 2', id: 2 },
    ]
  }
}

// const HOCFactory = (Component: React.Component) => {
//   class HOC extends React.Component {
//     render () {
//       return <Component {...props} />
//     }
//   }
//   return HOC
// }

