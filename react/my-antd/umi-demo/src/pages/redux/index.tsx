import React, {createContext, useState, useContext, useReducer } from 'react';
import store from '@/store';

export default () => {
  const state = store.getState()
  return (
    <div>
      <h2>redux</h2>
      <input type="text" value={state.inputValue} onChange={()=>console.log(3)}/>
      <ul>
        <li>
          {state.list}
        </li>
      </ul>
    </div>
  )
} 
