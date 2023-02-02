import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'

const Footer = () => {
    return (
        <Container>
            <Stack direction='row' spacing={2} 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <List>
                    <ListSubheader>Authentication</ListSubheader>

                    <ListItem>
                        <ListItemText>Sign Up</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>Log in</ListItemText>
                    </ListItem>
                </List>
                <List>
                    <ListSubheader>Info</ListSubheader>

                    <ListItem>
                        <ListItemText>About us</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>Contact us</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>Career</ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>Parent Site</ListItemText>
                    </ListItem>
                </List>

                <List>
                    <ListSubheader>Good Listens</ListSubheader>
                    
                    <ListItem>
                        <ListItemText>
                            <Link rel='noopener' underline='none' href='https://open.spotify.com/track/35dSYPOnoGvis2ZOUe4xDv?si=be5ce0ab47494974'>
                                House on Fire - Rise Against
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            <Link rel='noopener' underline='none' href='https://open.spotify.com/track/0bkW98npv8EsWQ2fXFzK56?si=4ae8c8337f0d4309'>
                                From Eden - Hozier
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            <Link rel='noopener' underline='none' href='https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue?si=3c57d2f92bc9450c'>
                                Don't stop believin' - Journey
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            <Link rel='noopener' underline='none' href='https://open.spotify.com/track/64VLqyvVCCAXyqKCqs40z8?si=180a8d94852e44cb'>
                                While we sleep - Insomnium
                            </Link>
                        </ListItemText>
                    </ListItem>

                    <ListItem>
                        <ListItemText>
                            <Link rel='noopener' underline='none' href='https://open.spotify.com/track/0ePmfd8y7g4zs3E6ew7pDB?si=9aa4ce75f0284514'>
                                The Red Baron - Sabaton
                            </Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Stack>

            <Divider sx={{marginY: '8px'}}/>

            <Typography textAlign={'center'}>Made with &#10084; by <Link rel='noopener' underline='hover' href='https://github.com/mmxNiloy'>mmx</Link></Typography>
        </Container>
    )
}

export default Footer;