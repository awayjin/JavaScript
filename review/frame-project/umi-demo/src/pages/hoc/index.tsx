import React, {createContext, useState, useContext, Suspense} from 'react';
import HocDemoClass from './withMouse'

export default () => {
  return (
    <div>
      33
      <HocDemoClass a={44} onClick={() => console.log('click')} />
    </div>
  )
};

// const HOCFactory = (Component: React.Component) => {
//   class HOC extends React.Component {
//     render () {
//       return <Component {...props} />
//     }
//   }
//   return HOC
// }

