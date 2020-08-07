import React from 'react'

export const themes = {
  light: {
    color: 'black',
    bg: '#999'
  },
  dark: {
    color: 'white',
    bg: '#000'
  }
}

// export const ThemeContext = React.createContext(
//   themes.dark
// )

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
})

ThemeContext.displayName = 'AwayContentDisplayName';