// @ts-nocheck
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
// const ThemeContext = React.createContext(themes.light)
const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
})

// ThemeButton
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

// ThemeToggleButton
function ThemeToggleButton() {
  return (
    <ThemeContext.Consumer>
      {
        ({theme, toggleTheme}) => (
          <div>
            <h2>在嵌套组件中更新 Context: { theme.background }</h2>
            <button onClick={toggleTheme} style={{ backgroundColor: theme.background }}>
              toggle theme
            </button>
          </div>
        )
      }
    </ThemeContext.Consumer>  
  )
}


function Toolbar(props: any) {
  return (
    <ThemeButton onClick={props.changeTheme}>Change Theme</ThemeButton>
  )
}

// @ts-nocheck
export class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: themes.dark,
      toggleTheme: this.toggleTheme
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
        <ThemeContext.Provider value={this.state}>
          <ThemeToggleButton />
        </ThemeContext.Provider>
        {/* <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider> */}
      </>
    );
  }
}
