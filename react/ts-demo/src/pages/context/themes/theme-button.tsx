import React from 'react'
import { ThemeContext } from './theme-context'

class ThemeButton extends React.Component<any, any> {
  render () {
    let props = this.props
    let theme = this.context
    console.log('from ThemeButton props:', props)
    return (
      <>
        <button
          {...props}
          style={{ color: theme.color, backgroundColor: theme.bg }}
        />
        <div {...props}>{ props.children } { this.context.color }</div>
      </>
    )
  }
}
ThemeButton.contextType = ThemeContext

export default ThemeButton