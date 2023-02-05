import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Stack from "@mui/material/Stack"
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "@mui/material/styles"
import ResponsiveAppBar from "./ResponsiveAppBar"
import PersistentDrawer from "./PersistentDrawer"

const MyAppBar = ({onDrawerChange, onDrawerItemChange}) => {
    const theme = useTheme()
    const [logoDir, setLogoDir] = useState('/affsm_logo_dark.svg')
    const [isMenuOpen, setMenuOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const menuAnchorEl = useRef()

    const handleDrawerOpen = () => {
        onDrawerChange(true)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        onDrawerChange(false)
        setOpen(false);
    };

    useEffect(() => {
        if(theme.palette.mode === 'dark') setLogoDir('/affsm_logo_dark.svg')
        else setLogoDir('/affsm_logo_light.svg')
    }, [theme])

    

    const handleSettingsClick = (e) => {
        setMenuOpen(!isMenuOpen)
    }

    const settings = [
        {
            text: 'Profile',
            icon: <AccountCircleIcon/>,
        },
        {
            text: 'Preferences',
            icon: <SettingsIcon/>,
        },
        {
            text: 'Logout',
            icon: <LogoutIcon/>,
        }
    ]

    return (
        <Box flexGrow={1}>
            <ResponsiveAppBar position='static' open={open}>
                <Toolbar>
                    <IconButton 
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    onClick={handleDrawerOpen}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu">
                        <MenuIcon/>
                    </IconButton>

                    {/* <Image src={logoDir} alt='logo' height={64} width={128}/> */}
                    <Typography variant='h5' flexGrow={1}>
                        AFFSM
                    </Typography>

                    <Box flexGrow={0}>
                        <Tooltip title='Profile and Settings'>
                            <IconButton 
                            ref={menuAnchorEl}
                            onClick={handleSettingsClick}
                            sx={{p: 0}}>
                                <Avatar alt='user-avatar'/>
                            </IconButton>
                        </Tooltip>

                        <Menu 
                        sx={{ marginTop: '40px' }}
                        open={isMenuOpen}
                        keepMounted
                        anchorEl={menuAnchorEl.current}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        onClose={() => { setMenuOpen(false) }}>
                            {settings.map((item, index) => (
                                <MenuItem key={`profile_menu_item_${index}`}>
                                    <Stack
                                    direction={'row'} 
                                    spacing={2} 
                                    alignItems='center'
                                    justifyContent={'space-around'}>
                                        {item.icon}
                                        <Typography textAlign={'center'}>
                                            {item.text}
                                        </Typography>
                                    </Stack>
                                    
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </ResponsiveAppBar>

            <PersistentDrawer open={open} handleDrawerClose={handleDrawerClose} onDrawerItemChange={onDrawerItemChange}/>
        </Box>
        
    )
}

export default MyAppBar