import * as React from 'react'

// React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用

// 有些组件无法提前知晓它们子组件的具体内容。

// 包含关系
// children prop 来将他们的子组件传递到渲染结果中
function FancyBorder(props) {
  return (
    <div className={ 'fancyBorder-' + props.color }>
      { props.children }
    </div>
  )
}

// 别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们
function Dialog(props) {
  return (
    <FancyBorder color={ 'blue'}>
      <h1 className={ 'dialog-title'}>
        { props.title }
      </h1>
      <p>
        { props.message }
      </p>
      {/*// 组合也同样适用于以 class 形式定义的组件*/}
      { props.children }
    </FancyBorder>
  )
}

// 组合也同样适用于以 class 形式定义的组件
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    )
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }

}

// 特例关系
function WelcomeDialog() {
  return (
    <Dialog
      title={ 'wel til'}
      message={ 'Thank you visiting our spacecraft.'}
    />
  )
}

// 预留出几个“洞”
function SplitPane (props) {
  return <div className={ 'split-pane'}>
    <div className={ 'split-pane-left' }>
      { props.left }
    </div>
    <div className={ 'split-pane-right' }>
      { props.right }
    </div>
  </div>
}

class Com extends React.Component {
  render () {
    return (
      <SplitPane left={ <Contacts /> } right={ <Chat /> } />
    )
  }
}

function Chat () {
  return <div>Chat</div>
}
function Contacts() {
  return (<div>Contacts3</div>)
}

export default () => {
  return <div>
    <Com />
    <WelcomeDialog />
    <SignUpDialog />
  </div>
}