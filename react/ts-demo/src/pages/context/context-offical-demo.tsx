import React, { useContext } from 'react'
// 创建一个 Context 对象
const ThemeContext = React.createContext('light')
export class ContextPage extends React.Component<any, any> {
  constructor (props: any) {
    super(props)
    this.state = {
      value: 'light'
    }
  }
  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.value}>
          <Header />
          <ThemeContext.Consumer>
            {value => (<div>inner:{ value}</div>)}
          </ThemeContext.Consumer>
        </ThemeContext.Provider>
        {/* <ThemeContext.Consumer>
          {
            value => (
              <div
                onClick={() => {
                  if (this.state.value === 'light') {
                    return this.setState({ value: 'dark' })
                  }
                  this.setState({ value: 'light' })
                }}
              >
                {
                  this.state.value === 'light' ?
                    <h3>
                      outer toggle value: {value}
                    </h3>
                    : <h4>theme consumer。 {value}</h4>
                }
              </div>
            )
          }
        </ThemeContext.Consumer> */}
      </div>
    );
  }
}
function Header() {
  return (
    <ThemeButton />
  )
}
// class 实现
class ThemeButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      update: 'update view',
      value: 'themet btn value'
    }
  }
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = ThemeContext;
  componentDidMount() {
    // console.log('---> this.contextType:', this.contextType)
    // console.log('ThemeButton.contextType:', ThemeButton.contextType)
    // console.log('ThemeContext:', ThemeContext)
  }
  componentDidUpdate() {
    // console.log('-->componentDidUpdate', this)
  }
  render() {
    return (
      <>
        <button >{this.context}</button>
        <button onClick={() => {
          this.setState({ update: 'go to update view' })
        }}>{this.state.update}</button>

        <ThemeContext.Consumer>
          {
            value => (
              <div
                onClick={() => {
                  console.log('this.state.value:', this.state.value)
                  if (this.state.value === 'light') {
                    value = 'aa'
                    return this.setState({ value: 'dark' })
                  }
                  value = 'bb'
                  this.setState({ value: 'light' })
                }}
              >
                {
                  this.state.value === 'light' ?
                    <h3>
                      outer toggle value: {value}
                    </h3>
                    :
                    <h4>
                      theme consumer。 {value}
                    </h4>
                }
              </div>
            )
          }
        </ThemeContext.Consumer>
      </>
    );
  }
}
// ThemeButton.contextType = ThemeContext // 静态属性
// 函数实现
function ThemeButton2(props: any, context: any) {
  const value = useContext(ThemeContext)
  return (
    <button >{value}</button>
  )
}