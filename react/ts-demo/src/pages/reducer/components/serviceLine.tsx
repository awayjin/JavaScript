import React, {createContext, useState} from "react";

interface ISerContext {
  name: string;
  id: string | number;
}
const obj: ISerContext = {
  name: '',
  id: ''
}
export const SerLineContext = createContext(obj);
let value = 1;
export function ServiceLine(props: { children: React.ReactNode; }) {
  const [serviceLine, setServiceLine] = useState({ name: 'default', id: '0'});
  const toggleServiceLine = () => {
    if (value % 2 === 0) {
      setServiceLine({ name: 'switch', id: '1'});
    } else {
      setServiceLine({ name: 'default', id: '0'});
    }
    value++
  }
  return (
    <SerLineContext.Provider value={serviceLine}>
      <h2>1. 业务线: { serviceLine.name }</h2>
      <button onClick={() => toggleServiceLine()}>切换业务线</button>
      { props.children }
    </SerLineContext.Provider>
  )
}