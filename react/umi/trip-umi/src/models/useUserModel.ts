import {useCallback, useState} from "react";

export default function useUserModel() {
  const [user, setUser] = useState({});
  const signIn = useCallback((account, pwd) => {
    console.log('signIn:', account, pwd)
    if (account && pwd) {
      setUser({ account, pwd})
    }
  }, [])
  const signOut = useCallback(() => {
    console.log('signOut')
    setUser({})
  }, [])

  return {
    user,
    signIn,
    signOut,
  }
}
