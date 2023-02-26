import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react'

const PreferencesFragment = ({toggleTheme}) => {
    const [theme, setTheme] = useState('light')

    const handleThemeSwitch = () => {
        let t = theme
        if(t === 'light') t = 'dark'
        else t = 'light'

        setTheme(t)
        localStorage.setItem('theme', t.toLowerCase())
        toggleTheme()
    }

    useEffect(() => {
        let t = localStorage.getItem('theme')
        if(t === 'dark') t = 'dark'
        else t = 'light'

        setTheme(t)
    }, [])

    return (
        <Container>
            <Typography variant='h6'>
                Set the theme of the application
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Switch checked={theme === 'dark'} onChange={handleThemeSwitch}/>} label={theme}/>
            </FormGroup>
            
        </Container>
    )
}

export default PreferencesFragment