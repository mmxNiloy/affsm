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
import DashboardFragment from "../../components/DashboardComponents/Fragments/DashboardFragment"
import { ListItems } from "../../components/DashboardComponents/DashboardEnums"
import NoticeFragment from "../../components/DashboardComponents/Fragments/NoticeFragment"

const Dashboard = () => {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [selectedDrawerItem, setSelectedDrawerItem] = useState(ListItems.DAHSBOARD)

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
            <MyAppBar onDrawerChange={setDrawerOpen} onDrawerItemChange={setSelectedDrawerItem}/>

            <MainContentWrapper open={isDrawerOpen}>
                {/* <MyCircularProgress loading={loading}/> */}

                {selectedDrawerItem === ListItems.DAHSBOARD && <DashboardFragment/>}
                {selectedDrawerItem === ListItems.ITEM_1 && <NoticeFragment/>}
            </MainContentWrapper>

        </Box>
    )
}

export default Dashboard