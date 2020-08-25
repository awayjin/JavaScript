import React, {createContext, useState, useContext} from 'react';
import styles from './index.less';
import ReactDOM from 'react-dom';

const lines = [
  { line: 'line1', id: '01'},
  { line: 'line2', id: '02'},
];


// class ToggleLine extends React.Component<any, any> {
//   static contextType = LineContext;
//   componentDidMount() {
//     console.log('this.context:', this.context)
//     console.log('this.props:', this.props)
//   }
//   render() {
//     const props = this.props;
//     const context = this.context;
//     return (
//       <>
//         <ul>
//           { lines.map(item => {
//             return <li key={item.id}> { item.line}</li>
//           })}
//         </ul>
//         <p>
//           { this.context.line }
//         </p>
//         <button {...this.props} />
//       </>
//     )
//   }
// }

const LineContext = createContext({
  line: lines[1],
  list: [],
  toggleLine: () => {},
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
    const cur = item === lines[0]
      ? lines[1]
      : lines[0]
    this.setState({
      line: cur,
      toggleLine: this.toggleLine,
    })
  }
  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
    // console.log('this.state:', this.state)
  }

  render () {
    const el = (
      <LineContext.Provider value={this.state}>
        <LineToggleButton />
      </LineContext.Provider>
    )
    return (
      <>
        {/*<LineContext.Provider value={this.state.cur}>*/}
        {/*  <Toolbar toggleLine={this.toggleLine} />*/}
        {/*</LineContext.Provider>*/}
        { el }33
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


// (props: any) => {
//   const [list, setList] = useState(lines);
//   const [currentLine, setCurrentLine] = useState(lines[0]);
//   const bool = true
//   const toggleList = (item: any) => {
//     console.log(item)
//     setCurrentLine(bool ? lines[1] : lines[0])
//   }
//   return (
//     <>
//       <h2> context </h2>
//       <LineContext.Provider value={currentLine}>
//         {/*<ToggleLine />*/}
//         <Toolbar toggleList={() => toggleList} />
//       </LineContext.Provider>
//     </>
//   );
// }
