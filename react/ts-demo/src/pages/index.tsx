import React, {useContext, useState} from "react";
import {ThemeContext} from "../router";

export function Home() {
  const theme = useContext(ThemeContext)
  return (
    <>
      <h2>Home</h2>
      <button style={theme} > theme </button>
    </>
  )
}
