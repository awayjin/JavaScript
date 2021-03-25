import React, { PureComponent, Component } from 'react';

// class Lifecycle extends React.Component<any, any> {
class Lifecycle extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: 'demo-old',
      count: 10,
      obj: {id: 1}
    }
  }


  increase = () => {

    this.setState({count: this.state.count})
  }
  componentDidMount() {
    // this.state.count++
  }

  render() {
   
    return (
      <>
        <div>
          count: demo
        </div>

      </>
    );
  }
}

export default Lifecycle;
