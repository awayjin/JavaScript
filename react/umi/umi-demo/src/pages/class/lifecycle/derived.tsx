import React, { PureComponent, Component } from 'react';

class Lifecycle extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: 'email1',
      count: 10,
    }
  }

  increase = () => {
    this.setState({count: this.state.count})
  }
  componentDidMount() {
    // this.state.count++
  }
  handleChange = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }
  render() {
    const { age, email } = this.state;

    return (
      <>
        <div>
          parent: <input
            type="text"
            onChange={this.handleChange}
            value={this.state.email}
          />
          - { email }

        </div>
        <EmailInput email={this.state.email} />
      </>
    );
  }
}

class EmailInput extends Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      email: this.props.email,
      age: 20
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    const {
      age,
      email,
    } = this.state;
    console.log(this.props)
    return <>
      child: <input
        type="text"
        onChange={this.handleChange}
        value={this.state.email}
      />
      - { email }
    </>
  }
  handleChange = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }
  shouldComponentUpdate(d, c) {
    console.log('d:', d)
    console.log('c:', c)
    if (d.email !== c.email) {
      this.setState({
        email: d.email
      })
      return true
    }
    return false
  }
  // componentWillReceiveProps(nextProps: any) {
  getDeriveStateFromProps(nextProps: any) {
    console.log('nextProps:', nextProps)
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    this.setState({
      email: nextProps.email
    })
  }
}

export default Lifecycle;
