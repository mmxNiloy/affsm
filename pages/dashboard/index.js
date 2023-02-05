import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress"
import MyAppBar from "../../components/DashboardComponents/MyAppBar"
import MainContentWrapper from "../../components/DashboardComponents/MainContentWrapper"

const Dashboard = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        if(loading) return

        setLoading(true)
        const mUser = JSON.parse(sessionStorage.getItem('user'))

        // Handle unauthorised access
        // if(!Boolean(mUser)) {
        //     router.replace('/')
        //     return;
        // }

        // setUser(mUser)
        // setLoading(false)
    }, [])
    return (
        <Box>
            {/* Do not render these componenets if the user is null */}
            <MyAppBar onDrawerChange={setDrawerOpen}/>

            <MainContentWrapper open={isDrawerOpen}>
                {/* <MyCircularProgress loading={loading}/> */}

                <Typography variant='h3'>Welcome to AFFSM</Typography>
                
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </MainContentWrapper>

        </Box>
    )
}

export default Dashboard