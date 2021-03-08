// @ts-nocheck
// https://github.com/ant-design/ant-design/issues/15244#issuecomment-470381917
import React, { setState, useState } from "react";
import "antd/dist/antd.css";
// import "./index.css";
import { Select, Form } from "antd";

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

// class CustomSelect extends React.Component {
//   state = {
//     value: ["a10", "c12"]
//   };

//   onSelectChange = val => {
//     console.log(val.length);
//     const MAX = 3;
//     val.length <= MAX && this.setState({ value: val });
//   };

//   render() {
//     return (
//       <Select
//         mode="multiple"
//         style={{ width: "100%" }}
//         placeholder="Please select"
//         value={this.state.value}
//         onChange={this.onSelectChange}
//       >
//         {children}
//       </Select>
//     );
//   }
// }

const CustomSelect = () => {
  const [valueTag, setValueTag] = useState(["a10", "c12"]);
  const onSelectChange = val => {
    console.log(val.length);
    const MAX = 3;
    val.length <= MAX && setValueTag(val);
  };
  return (
    <Form.Item
            name="labelPart"
            label="部门标签"
            extra="最多选择5个标签"
          >
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Please select"
      value={valueTag}
      onChange={onSelectChange}
    >
      {children}
    </Select>
          </Form.Item>

  );
}


export default () => {
  return (
    <div>
      <h2>antd</h2>
      <CustomSelect />
    </div>
  )
};
