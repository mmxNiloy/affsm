import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import MyAppBar from "../../components/DashboardComponents/MyAppBar"
import MainContentWrapper from "../../components/DashboardComponents/MainContentWrapper"
import DashboardFragment from "../../components/DashboardComponents/Fragments/DashboardFragment"
import { ListItems } from "../../components/DashboardComponents/DashboardEnums"
import NoticeFragment from "../../components/DashboardComponents/Fragments/NoticeFragment"
import FormSubmissionFragment from "../../components/DashboardComponents/Fragments/FormSubmissionFragment"
import FormActivationFragment from "../../components/DashboardComponents/Fragments/FormActivationFragment"
import AdmitCardFragment from "../../components/DashboardComponents/Fragments/AdmitCardFragment"
import HistoryFragment from "../../components/DashboardComponents/Fragments/HistoryFragment"
import AllMailsFragment from "../../components/DashboardComponents/Fragments/AllMailsFragment"
import TrashFragment from "../../components/DashboardComponents/Fragments/TrashFragment"
import SpamFragment from "../../components/DashboardComponents/Fragments/SpamFragment"
import axios from "axios"
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress"

const Dashboard = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [selectedDrawerItem, setSelectedDrawerItem] = useState(ListItems.DAHSBOARD)

    const getUser = async () => {
        if(loading) return

        setLoading(true)

        // Code
        try {
            const req = await axios.get('/api/auth/verify')
            setUser(req.data.user)
        } catch(err) {
            // !Fatal error, session has expired
            // !Send the user to the login page
            console.log('No User Found Exception', err);
            
            // TODO: Show an alert about the unauthorized access
            alert('Session has expired. Please log in again.')
            router.replace('/')
        }

        setLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [user])

    if(!Boolean(user) || !Boolean(user.first_name)) return <MyCircularProgress/>
    
    return (
        <Box>
            {/* Do not render these componenets if the user is null */}
            <MyAppBar onDrawerChange={setDrawerOpen} onDrawerItemChange={setSelectedDrawerItem}/>

            <MainContentWrapper open={isDrawerOpen}>
                {/* <MyCircularProgress loading={loading}/> */}
                {selectedDrawerItem === ListItems.DAHSBOARD && <DashboardFragment user={user}/>}
                {selectedDrawerItem === ListItems.ITEM_1 && <NoticeFragment/>}
                
                {selectedDrawerItem === ListItems.ITEM_2 && <FormSubmissionFragment user={user}/>}

                {selectedDrawerItem === ListItems.ITEM_3 && <FormActivationFragment/>}
                {selectedDrawerItem === ListItems.ITEM_4 && <AdmitCardFragment/>}
                {selectedDrawerItem === ListItems.ITEM_5 && <HistoryFragment/>}
                {selectedDrawerItem === ListItems.ITEM_6 && <AllMailsFragment/>}
                {selectedDrawerItem === ListItems.ITEM_7 && <TrashFragment/>}
                {selectedDrawerItem === ListItems.ITEM_8 && <SpamFragment/>}
                
            </MainContentWrapper>

        </Box>
    )
}

export default Dashboard 