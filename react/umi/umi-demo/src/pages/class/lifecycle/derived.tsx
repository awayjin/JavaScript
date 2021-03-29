import React, { PureComponent, Component, createRef } from 'react';

class Lifecycle extends Component<any, any> {
  inputRef: any = createRef();
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
    console.log('this.inputRef:', this.inputRef);
    // console.log('resetEmailForNewUser:', this.inputRef.current.resetEmailForNewUser);

    // this.setState({
    //   email: event.target.value
    // })

    const _this = this
    const value =  event.target.value
    this.setState({ email: value }, () => {
      // console.log('event?.target:', event?.target, event);
      if (value) {
        this.inputRef.current.resetEmailForNewUser(value);
      }
    });

    // this.inputRef.current.resetEmailForNewUser(event.target.value);
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
          -- { email }
          <button
            onClick={() => {
              this.setState({ email: 'd' })
            }}
          >reset</button>
        </div>
        <EmailInput
          email={this.state.email}
          handleChange={this.handleChange}
         />
         <EmailInput2
           key={this.state.email}
           defaultEmail = {this.state.email}
         />
         <EmailInput3
           ref={this.inputRef}
           defaultEmail = {this.state.email}
         />

         <EmailInput4
           list = {
            [
              { id: 1, text: 'memoization'},
              { id: 2, text: 'lifecycle'},
              { id: 3, text: 'lifecycle constructor'},
              { id: 4, text: 'lifecycle getDerivedStateFromProps'},
              { id: 5, text: 'lifecycle render'},
              { id: 6, text: 'lifecycle componentDidMount'},
            ]
           }
         />
      </>
    );
  }
}

class EmailInput4 extends Component<any, any> {
  state: any = {
    filterText: '',
  };

  // *******************************************************
  // 注意：这个例子不是建议的方法。
  // 下面的例子才是建议的方法。
  // *******************************************************
  static getDerivedStateFromProps(props: any, state: any) {
    console.log('4. props :', props);
    console.log('4. state :', state);
    // 列表变化或者过滤文本变化时都重新过滤。
    // 注意我们要存储 prevFilterText 和 prevPropsList 来检测变化。
    if (
      props.list !== state.prevPropsList ||
      state.prevFilterText !== state.filterText
    ) {
      return {
        prevPropsList: props.list,
        prevFilterText: state.filterText,
        filteredList: props.list?.filter((item: any) => item.text.includes(state.filterText))
      };
    }
    return null;
  }

  handleChange = (event: any) => {
    this.setState({
      filterText: event.target.value
    })
  }

  render() {
    return <>
      <React.Fragment>
        EmailInput4: <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {
            this.state?.filteredList?.map(
              (item: any) => <li key={item.id}>{item.text}</li>
            )
          }
        </ul>
      </React.Fragment>
    </>;
  }
}

class EmailInput3 extends Component<any, any> {
  state = { email: this.props.defaultEmail };

  handleChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  // componentWillReceiveProps (props: any) {
  //   console.log('4. ei 4:', props);
  // }
  static getDerivedStateFromProps(props: any) {
    console.log('3. ei 3:', props);
    return null
  }

  resetEmailForNewUser(defaultEmail: any) {
    this.setState({ email: defaultEmail });
  }

  render() {
    return <div>
      EmailInput3: <input onChange={this.handleChange} value={this.state.email} />
    </div>;
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
    // console.log('props:', this.props)
    return <>
      child: <input
        type="text"
        onChange={this.props.handleChange}
        value={this.props.email}
      />
      - { email }
      <input type="text"/>
    </>
  }
  handleChange = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }
  // shouldComponentUpdate(d, c) {
  //   console.log('d:', d)
  //   console.log('c:', c)
  //   if (d.email !== c.email) {
  //     this.setState({
  //       email: d.email
  //     })
  //     return true
  //   }
  //   return false
  // }
  // componentWillReceiveProps(nextProps: any) {
  static getDerivedStateFromProps(nextProps: any) {
    console.log('1. nextProps:', nextProps)
    // 这会覆盖所有组件内的 state 更新！
    // 不要这样做。
    // if (nextProps.email !== this.props.email) {
    //   this.setState({
    //     email: nextProps.email
    //   })
    // }
    // return 33
  }
}

class EmailInput2 extends Component<any, any> {
  state = { email: this.props.defaultEmail };

  handleChange = (event: any) => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <div>
      EmailInput2: <input onChange={this.handleChange} value={this.state.email} />
    </div>;
  }
}

export default Lifecycle;
