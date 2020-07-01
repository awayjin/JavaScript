import React, {useContext} from "react";
import {ThemeContext} from "../../router";

export function About() {
  const theme = useContext(ThemeContext)

  const toggleTheme = () => {
    console.log('theme')
  }

  return (
    <>
      <button style={theme} onClick={toggleTheme}> theme </button>
      <h2>About</h2>
    </>
  );
}