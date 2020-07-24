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

export const ThemeContext = React.createContext(
  themes.dark
)