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
          state.theme === themes.dark ? themes.light : themes.dark,
      }
    ))
  }
  toggleLine (value)  {
    console.log('value:', value)
  }
  render() {
    return (
      <>
        <h2>content</h2>
        <ThemeContext.Provider value={this.state}>
          <p>
            <button onClick={() => {this.toggleLine(1)}}>s1 line</button>
            <button onClick={() =>this.toggleLine(2)}>2 line</button>
          </p>
          {/* <ThemeToggleButton /> */}
          <ThemeContext.Consumer>
            { ({theme, toggleTheme }) => (
              <>
                <div>theme: {theme.background}</div>
                <button onClick={toggleTheme}>Click me to swtich a theme.</button>
              </>
            )}  
          </ThemeContext.Consumer>  
        </ThemeContext.Provider>
      </>
    );
  }
}
