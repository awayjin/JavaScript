import React, { createContext } from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}
const ThemeContext = React.createContext(themes.light)

class ThemeButton extends React.Component<any, any>{
  render () {
    const context = this.context
    console.log('context:', context)
    console.log('this.props:', this.props)
    return (
      <>
        <button {...this.props} style={{ backgroundColor: context.background }} />
        <p>background: { context.background }</p>
      </>
    );
  }
}
ThemeButton.contextType = ThemeContext

function Toolbar(props: any) {
  return (
    <ThemeButton onClick={props.changeTheme}>Change Theme</ThemeButton>
  )
}

export class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: themes.dark
    }
  }
  toggleTheme = () => {
    this.setState((state: any) => (
      {
        theme:
          state.theme === themes.dark ? themes.light : themes.dark
      }
    ))
  }
  render() {
    return (
      <>
        <h2>content</h2>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
      </>
    );
  }
}
