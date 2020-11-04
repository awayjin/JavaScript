import React, {useCallback, useEffect, useMemo, useState} from "react";
import { connect } from 'dva'
import { useTitleHook, useHttpHook } from '@/hooks'

function Dva (props: any) {
  const [state, setState] = useState('customize useTitleHook');
  const title = useTitleHook(state);

  const [result, loading] =useHttpHook({
    url: '/getListAsync',
    method: 'get',
    watch: [state]
  })
  console.log('result:', result)
  console.log('loading:', loading)

  return <>
    <h2>customize hook</h2>
    <p onClick={()=> setState('customize changes')}>
      { title }
    </p>
  </>
}

export default connect(({ search }: any) => ({
  search
}))(Dva);

