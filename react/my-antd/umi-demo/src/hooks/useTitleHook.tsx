import {useEffect, useLayoutEffect, useState} from "react";

export default function useTitleHook(title: any){
  const [state, setState] = useState()
  useLayoutEffect(() => {
    document.title = title
    setState(title)
  }, [title])

  return state
}
