import React, { createContext } from 'react';
// @ts-nocheck
// https://zh-hans.reactjs.org/docs/context.html

// demo1
// import { ContextPage } from './context-offical-demo'
// export { ContextPage }
// import React, { useContext } from 'react';
// import { ThemeContext, themes } from './themes/theme-context'

const ContextServiceLine = React.createContext({
  serviceLine: { id: 1, name: 'line one'},
  // serviceLine: any,
  toggleServiceLine: () => {}
})


function ServiceLine () {
  // const context = createContext(ContextServiceLine)
  // console.log('context:', context)
  function switchServiceLine () {
    console.log('dd')
  }
  return (
    <div className="service-line">
      <h2>ServiceLine</h2>
      {/*<ContextServiceLine.Consumer {({ serviceLine, toggleServiceLine }) => (
        <button onClick={toggleServiceLine} style={{ zIndex: serviceLine.id}}>
          toggle ser
        </button>)}>
      </ContextServiceLine.Consumer>*/}
      <button onClick={switchServiceLine}>toggle service line</button>
    </div>
  )
}
function Tree () {
  return (
    <div className="tree">tree</div>
  )
}

export class ContextPage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    // this.state = {}
  }
  static contextType = ContextServiceLine
  componentDidMount () {
    console.log('this.context:', this.context)
    console.log('this.props:', this.props)
  }
  render () {
    return (
      <>
        <ContextServiceLine.Provider value={this.context}>
          <ServiceLine />
          <Tree />
          <h3>3</h3>
        </ContextServiceLine.Provider>
      </>
    )
  }
}
