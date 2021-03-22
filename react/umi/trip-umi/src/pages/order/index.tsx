import React, { useState, useEffect } from "react";
import { useModel } from 'umi'

export default function (props: any) {
  const { user, signOut, signIn } = useModel('useUserModel')
  return (
    <div>
      order
      { JSON.stringify(user, null, 4) }
      <button onClick={() => signIn('acc2', 'pwd2')}>sign in</button>
      <button onClick={signOut}>sign out</button>
    </div>
  )
}
