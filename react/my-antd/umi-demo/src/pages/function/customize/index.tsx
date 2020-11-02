import React, {useCallback, useEffect, useMemo, useState} from "react";
import { connect } from 'dva'
import { useTitleHook } from '@/hooks'

function Dva (props: any) {
  const [state, setState] = useState('customize useTitleHook');
  const title = useTitleHook(state);

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

