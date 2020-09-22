import React, { Component } from 'react'

interface IProps {
  children: any;
  id: number;
}
// class Layout extends Component<any, any> {
//   constructor(props: IProps) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <h1>class layout header</h1>
//         {this.props.children}
//       </div>
//     );
//   }
// }

function Layout (props: IProps) {
  return (
    <div>
      <h1>class layout header FC</h1>
      {props.children}
    </div>
  );
}
export default Layout
