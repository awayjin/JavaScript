import React, { useState, useEffect } from 'react'
import { Button, Input, List } from "antd"

function TodoListUI (props) {
  const { inputValue, changeInputValue, clickBtn, list, deleteItem } = props
  return (
    <div>
      <h2>TodoList UI</h2>
      <div style={{margin:'10px'}}>
        <div>
          <Input
            placeholder='write someting'
            style={{ width:'250px', marginRight:'10px'}}
            value={inputValue}
            onChange={changeInputValue}
          /><Button type="primary" onClick={clickBtn}>增加</Button>
          <h3>{ inputValue }</h3>

        </div>
        <div style={{margin:'10px',width:'300px'}}>
          <List
            bordered
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                onClick={deleteItem}
              >
                {item.name}, {item.age}
              </List.Item>
            )}

          />
        </div>
      </div>
    </div>
  )
}

export default TodoListUI