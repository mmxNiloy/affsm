import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import MyAppBar from "../../components/DashboardComponents/AppBar/MyAppBar"
import MainContentWrapper from "../../components/DashboardComponents/AppBar/MainContentWrapper"
import DashboardFragment from "../../components/DashboardComponents/Fragments/DashboardFragment"
import { ListItems } from "../../components/DashboardComponents/DashboardEnums"
import NoticeFragment from "../../components/DashboardComponents/Fragments/NoticeFrags/NoticeFragment"
import FormSubmissionFragment from "../../components/DashboardComponents/Fragments/FormSubmissionFragment"
import FormActivationFragment from "../../components/DashboardComponents/Fragments/FormActivationFragment"
import AdmitCardFragment from "../../components/DashboardComponents/Fragments/AdmitCardFragment"
import HistoryFragment from "../../components/DashboardComponents/Fragments/HistoryFragment"
import AllMailsFragment from "../../components/DashboardComponents/Fragments/AllMailsFragment"
import TrashFragment from "../../components/DashboardComponents/Fragments/TrashFragment"
import SpamFragment from "../../components/DashboardComponents/Fragments/SpamFragment"
import axios from "axios"
import MyCircularProgress from "../../components/DashboardComponents/MyCircularProgress"
import AdminDashboardFragment from "../../components/DashboardComponents/Fragments/AdminDashboardFragment"
import NoticeSubmissionFragment from "../../components/DashboardComponents/Fragments/NoticeSubmissionFragment"


const AdminDashboard = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [selectedDrawerItem, setSelectedDrawerItem] = useState(ListItems.DAHSBOARD)
    const [user, setUser] = useState({})
    const [hasUser, setHasUser] = useState(false)

    const getUser = async () => {
        if(loading) return

        setLoading(true)
        // TODO: Do not make a request over and over again?
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

    const forwardToNotices = () => {
        //console.log('Forwarding to notifications')
        setSelectedDrawerItem(ListItems.NOTICES)
    }

    const forwardToPostNotices = () => {
        setSelectedDrawerItem(ListItems.POST_NOTICES)
    }

    useEffect(() => {
        // !Fix me: Sending request to the serve on each render
        // !Trade offer: Gain performance boost(Memory, network, cpu) or Sacrifice performace for realtime feedback?
        // I won't choose water over wine
        //if(hasUser) return
        getUser()
    }, [])

    if(!Boolean(user) || !Boolean(user.first_name)) return <MyCircularProgress/>

    return (
        <Box>
            {/* Do not render these componenets if the user is null */}
            <MyAppBar 
            selectedDrawerItem={selectedDrawerItem}
            isAdmin={true}
            onDrawerChange={setDrawerOpen} 
            onDrawerItemChange={setSelectedDrawerItem}/>

            <MainContentWrapper open={isDrawerOpen}>
                {/* <MyCircularProgress loading={loading}/> */}
                {selectedDrawerItem === ListItems.DAHSBOARD && 
                    <AdminDashboardFragment user={user} 
                    toNotices={forwardToNotices}
                    toPostNotices={forwardToPostNotices}/>}
                {selectedDrawerItem === ListItems.NOTICES && <NoticeFragment user={user}/>}
                {selectedDrawerItem === ListItems.POST_NOTICES && 
                    <NoticeSubmissionFragment 
                    user={user}
                    toNotices={forwardToNotices}/>}
                {selectedDrawerItem === ListItems.ACTIVE_FORMS && <FormActivationFragment user={user}/>}
                {selectedDrawerItem === ListItems.HISTORY && <HistoryFragment user={user}/>}
            </MainContentWrapper>

        </Box>
    )
}

export default AdminDashboard