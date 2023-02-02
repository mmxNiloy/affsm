import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const LogoDescription = () => {
    const theme = useTheme()
    const [logoDir, setLogoDir] = useState('/affsm_logo_dark.svg')

    useEffect(() => {
        if(theme.palette.mode === 'dark') setLogoDir('/affsm_logo_dark.svg')
        else setLogoDir('/affsm_logo_light.svg')
    }, [])

    return (
        <Stack spacing={1} direction='column'>
            <Image src={logoDir} alt='logo' height={360} width={480}/>
            {/* <img src={'/affsm_logo_2.svg'} alt='logo' height={'360px'} width={'480px'} /> */}
            {/* <Typography textAlign={'center'} variant='h4'>Welcome to AFFSM</Typography> */}
        </Stack>
    )
}

export default LogoDescription