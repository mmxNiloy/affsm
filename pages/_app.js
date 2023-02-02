import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles'
import lightTheme from '../theme/light'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

export default function App({ Component, pageProps }) {
  

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline/>
      <Box>
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  )
}
