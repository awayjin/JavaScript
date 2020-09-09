import React, {createContext, useState, useContext} from 'react';
// import styles from './index.less';
import ReactDOM from 'react-dom';

const lines = [
  { line: 'line1', id: '01'},
  { line: 'line2', id: '02'},
  { line: 'line3', id: '03'},
];

const LineContext = createContext({
  line: lines[1],
  list: [],
  toggleLine: (item: any) => {},
});
function LineToggleButton() {
  return (
    <LineContext.Consumer>
      {
        ({ line, toggleLine, list }) => (
          <>
            <button onClick={toggleLine}>toggle line</button>
            <p>{ line.line }</p>
            <ul>
              {
                list.map((item: any) => {
                  return <li key={item.id} onClick={() => toggleLine(item)}>
                    { item.line }
                  </li>
                })
              }
            </ul>
          </>
        )
      }
    </LineContext.Consumer>
  )
}
export default class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      line: lines[0],
      list: lines,
      toggleLine: this.toggleLine,
    }
  }
  toggleLine = (item: any) => {
    console.log('item:', item)
    this.setState({
      line: item,
      toggleLine: this.toggleLine,
    })
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    // console.log('this.state')
  }

  render () {
    const el = (
      // @ts-ignore
      <LineContext.Provider value={this.state}>
        <LineToggleButton />
      </LineContext.Provider>
    )
    return (
      <>
        {/*<LineContext.Provider value={this.state.cur}>*/}
        {/*  <Toolbar toggleLine={this.toggleLine} />*/}
        {/*</LineContext.Provider>*/}
        { el }
      </>
    )
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
// function Toolbar(props: any) {
//   return (
//     <div>
//       <ToggleLine onClick={props.toggleLine} >
//         change line
//       </ToggleLine>
//     </div>
//   );
// }

