import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react'

const PreferencesFragment = ({toggleTheme}) => {
    const [theme, setTheme] = useState('Light')

    const handleThemeSwitch = () => {
        let t = theme
        let temp = theme
        if(t === 'Light') {
            t = process.env.NEXT_PUBLIC_DARK_THEME_KEY
            temp = 'Dark'
        } else {
            temp = 'Light'
            t = process.env.NEXT_PUBLIC_LIGHT_THEME_KEY
        }

        setTheme(temp)
        localStorage.setItem(process.env.NEXT_PUBLIC_THEME_KEY, t)
        toggleTheme()
    }

    useEffect(() => {
        let t = localStorage.getItem(process.env.NEXT_PUBLIC_THEME_KEY)
        let temp = 'Light'
        if(t === process.env.NEXT_PUBLIC_DARK_THEME_KEY) temp = 'Dark'
        else temp = 'Light'

        setTheme(temp)
    }, [])

    return (
        <Container>
            <Typography variant='h6'>
                Set the theme of the application
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Switch checked={theme === 'Dark'} onChange={handleThemeSwitch}/>} label={theme}/>
            </FormGroup>
            
        </Container>
    )
}

export default PreferencesFragment