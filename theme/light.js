import { createTheme } from '@mui/material/styles'
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: [
            '"Nunito"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        button: {
            textTransform: 'none',
        }
    },
    measurements: {
        drawerWidth: 240
    },
})

export default lightTheme