import React, {useReducer} from 'react';
// 简介： https://juejin.im/post/5c87c1b4f265da2dc453b6d6
import Buttons from './Buttons';
import ShowArea from './ShowArea'
import { Color } from './Color';   //引入Color组件

// export function ReducerPage () {
//   const [count, dispatch] = useReducer((state: any, action: any) => {
//     switch (action) {
//       case 'add':
//         return state + 1;
//       case 'sub':
//         return state - 1;
//     }
//   }, 0);
//   return (
//     <div>
//       <h2>count: { count }</h2>
//       <button onClick={() => dispatch('add')}>add</button>
//       <button onClick={() => dispatch('sub')}>sub</button>
//     </div>
//   );
// }

export const ReducerPage = () => {
  return (
    <div>
      <Color>
        <Buttons />
        <ShowArea />
      </Color>
    </div>
  )
}
