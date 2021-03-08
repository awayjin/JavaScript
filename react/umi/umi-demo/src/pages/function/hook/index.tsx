import React, {useCallback, useEffect, useMemo, useState} from "react";
import { connect } from 'dva'

function Dva (props: any) {
  const [count, setCount] = useState(10);
  const [text, setText] = useState('text-demo');

  async function demo() {
    console.log('demo')
    fetch('/api/getList?id=3')
  }
  useEffect(() => {
    // fetch('/api/getList?id=3')
    demo();
  })
  // console.log('props:', props)
  // demo();
  // console.log(22)

  const noCacheText = ()=> {
    console.log('text changed')
    return text
  }
  const memoText = useMemo(() => {
    console.log('memoText')
    return text
  }, [text]);

  // 引用相等
  // 昂贵的计算
  const handleCountCB = useCallback(() => {
    console.log('log changed useCallback')
    setCount(count+ 1)
  }, [count])
  const handleCount = ()=> {
    setCount(count + 1)
  }
  return <>
    <h2>hook</h2>
    <p onClick={handleCountCB}>
      handleCountCB: { count }
    </p>
    <p onClick={handleCount}>
      onClick: { count }
    </p>
    {/*<p>{ noCacheText() }</p>*/}
    <p>{ memoText }</p>
  </>
}

export default connect(({ search }: any) => ({
  search
}))(Dva);

