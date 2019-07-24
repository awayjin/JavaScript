import * as React from 'react'

class About extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      ab: 22
    }
  }

  handleClick () {
    let ab = this.state.ab
    let value
    if (ab === 22) {
      value = 44
    } else {
      value = 22
    }
    this.setState({
      ab: value
    })
  }

  render () {
    return (
      <div className={ 'default' } onClick={ this.handleClick }>
        about,  --{ this.state.ab }
        {
          this.state.ab > 22 &&
            <h2> 逻辑与-->22 </h2>
        }
      </div>
    )
  }
}

let backAbout = () => {
  return <About  />
}
export default backAbout

// export default (
//   <h1>Hello, Component, 33 </h1>
// )

// ReacDOM.render(
//   <Welcome name={'name comp props...'} />,
//   document.querySelector('#app')
// )