// @ts-nocheck3
// https://zh-hans.reactjs.org/docs/context.html

// demo1
// import { ContextPage } from './context-offical-demo'
// export { ContextPage }

import React, { useContext } from 'react'
import { ThemeContext, themes } from './themes/theme-context'

export class ContextPage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
  }
  componentDidMount () {
    console.log('this.context:', this.context)
    console.log('this.props:', this.props)
  }
  render () {
    return (
      <>
        <ThemeContext.Provider value={{ theme: themes.dark, toggleTheme: () => {}}}>
          <h3>3</h3>
        </ThemeContext.Provider>
      </>
    )
  }
}
ContextPage.contextType = ThemeContext