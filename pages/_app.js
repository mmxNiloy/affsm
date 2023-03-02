import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import lightTheme from '../theme/light'
import darkTheme from '../theme/dark'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  const [toggleTheme, setToggleTheme] = useState(false)

  const handleToggleTheme = () => {
    setToggleTheme(!toggleTheme)
  }

  useEffect(() => {
    let t = localStorage.getItem(process.env.NEXT_PUBLIC_THEME_KEY)
    if(t === process.env.NEXT_PUBLIC_DARK_THEME_KEY) setToggleTheme(true)
    else setToggleTheme(false)
    
    if(toggleTheme || t === process.env.NEXT_PUBLIC_DARK_THEME_KEY) setCurrentTheme(darkTheme)
    else setCurrentTheme(lightTheme)
  }, [toggleTheme])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <Box>
        <Component {...pageProps} toggleTheme={handleToggleTheme} />
      </Box>
    </ThemeProvider>
  )
}
