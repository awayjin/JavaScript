import React, { useState } from 'react'
import './index.css'

// 组件组合： https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html

export function FormPage () {

  return (
    <>
      <h2>表单 form </h2>
      <NameForm name={'class form'}></NameForm>
      <NameFormFC name={'fc 非受控组件'} />
    </>
  )
}

interface IFCProps {
  name: string;
  age?: number;
}
const NameFormFC: React.FC<IFCProps> = (props) => {
  const input: any = React.createRef()
  const  handleSubmit = (event: any) => {
    console.log('A name was submitted: ', input.current.value);
    event.preventDefault();
  }
  const [value, setValue] = useState('defaultValue 333')
  return (
    <>
      <h2>Function Component. { props.name }</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={input} defaultValue={value}  />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  )
};

class NameForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 3,
      valueSelect: 'coconut',
      isGoing: true,
      numberOfGuests: 2,
    }
  }
  handleSubmit = (e: any) => {
    console.log(this.state, e)
    e.preventDefault()
  };
  handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    })
  };
  handleSelect = (e: any) => {
    this.setState({
      valueSelect: e.target.value
    })
  };
  handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };
  render () {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字: { value }
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        <label >
          <h3>普通 textarea</h3>
          {/*<textarea />*/}
          {/*你好， 这是在 text area 里的文本*/}
          <h3>React textarea</h3>
          <textarea name={'desc'} value={value} onChange={this.handleChange} />
        </label>
        <label htmlFor="">
          <h3>select 标签</h3>
          <select value={this.state.valueSelect} onChange={this.handleSelect}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>

        <label htmlFor={'passPorps'}>
          <h3>处理多个输入</h3>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
          <input name={'passPorps'} type="text" value={this.props.name} onChange={this.handleChange}/>
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>

        <input type="submit" value="提交" />

        <hr/>
      </form>
    )
  }
}