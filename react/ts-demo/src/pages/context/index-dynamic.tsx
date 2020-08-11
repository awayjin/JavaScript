// https://zh-hans.reactjs.org/docs/context.html

import React, { useContext } from 'react'

const themes = {
  light: {
    color: 'black',
    bg: '#999'
  },
  dark: {
    color: 'white',
    bg: '#000'
  }
}
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {}
})

class ThemeButton extends React.Component<any, any> {
  static contextType = ThemeContext;
  componentDidMount () {
    console.log('componentDidMount this.context:')
    console.log(this.context)
  }
  componentDidUpdate () {
    console.log('componentDidUpdate this.props:', this.props)
  }
  render () {
    const ct = this.context
    return (
      <>
        <button {...this.props} style={{ backgroundColor: ct.bg, color: ct.color  }} />
        bg: { ct.bg } --- { ct.theme?.bg}
      </>
    )
  }
}

// 一个使用 ThemedButton 的中间组件
function Toolbar(props: any) {
  return (
    <ThemeButton onClick={props.changeTheme} className={"thebtn"} >
      <h3 >changeTheme 43</h3>
      changeTheme
    </ThemeButton>
  )
}

export class ContextPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: themes.light
    }
  }
  toggleTheme = () => {
    this.setState(
      (state: any, props: any) => ({
        theme: state.theme === themes.dark
          ? themes.light
          : themes.dark,
      })
    );
  }
  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemeButton />
        </section>
      </div>
    );
  }
}