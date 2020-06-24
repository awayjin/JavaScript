// @ts-nocheck
import React, { useState, createContext, useContext, Component } from "react";

import { ToggleProvider, ToggleConsumer } from './ToggleContext'

export function Context() {
  // 2-1. 使用 ToggleProvider 组件
  // 2-2. 如果有其他组件一样可以共享 state
  return (
    <ToggleProvider>
      <Pannel></Pannel>
      {/* 其他组件仍然可以通过 props 访问到共享的 state */}
    </ToggleProvider>
  )
}

const Pannel = () => {
  // 在多个层级内直接通过 props 获取 state 和方法，调用方法改变 state
  return (
    <ToggleConsumer>
      {
        ({ toggle, handleToggle }) => {
          return (
            <div onClick={() => handleToggle()}>
              { toggle ? '✔' : '❌'}
            </div>
          )
        }}
    </ToggleConsumer>
  )
}

