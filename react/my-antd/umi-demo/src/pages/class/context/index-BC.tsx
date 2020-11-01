import React, {createContext, useState, useContext} from 'react';


const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemesContext = createContext(themes.light)

export default () => {
  return (
    <div>
      context
      <ThemesContext.Provider value={themes.dark}>
         <Toolbar></Toolbar>
      </ThemesContext.Provider>
    </div>
  )
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props: any) {
  return (
    <div>
      <ThemeButton></ThemeButton>
    </div>
  );
}

function ThemeButton () {
  const context = useContext(ThemesContext);
  console.log('context:', context)
  return (
    <div>
      <button {...context}>btn</button>
    </div>
  )
}