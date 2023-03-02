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
import Head from "next/head"

const Dashboard = ({toggleTheme}) => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [hasUser, setHasUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [selectedDrawerItem, setSelectedDrawerItem] = useState(ListItems.DAHSBOARD)

    const getUser = async () => {
        if(loading) return

        setLoading(true)

        // Code
        try {
            const key = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_SECRET_KEY)
            const req = await axios.get('/api/auth/verify', {
                params: {
                    key,
                }
            })
            setUser(req.data.user)
            setHasUser(true)
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

    useEffect(() => {
        // !Fix me: Sending request to the serve on each render
        //if(hasUser) return
        getUser()
    }, [])

    if(!Boolean(user) || !Boolean(user.first_name)) return <MyCircularProgress/>
    
    return (
        <>
            <Head>
                <title>
                    AFFSM | Dashboard
                </title>
                <link rel="icon" href="/cu_icon.ico" />
            </Head>

            <main>
                <Box>
                    {/* Do not render these componenets if the user is null */}
                    <MyAppBar 
                    selectedDrawerItem={selectedDrawerItem}
                    onDrawerChange={setDrawerOpen} 
                    onDrawerItemChange={setSelectedDrawerItem}/>

                    <MainContentWrapper open={isDrawerOpen}>
                        {/* <MyCircularProgress loading={loading}/> */}
                        {selectedDrawerItem === ListItems.DAHSBOARD && 
                        <DashboardFragment 
                        toggleTheme={toggleTheme} 
                        user={user}
                        toNotices={forwardToNotices}/>}
                        {selectedDrawerItem === ListItems.NOTICES && <NoticeFragment/>}
                        
                        {selectedDrawerItem === ListItems.FORM_SUBMISSION && <FormSubmissionFragment user={user}/>}

                        {selectedDrawerItem === ListItems.ACTIVE_FORMS && <FormActivationFragment/>}
                        {selectedDrawerItem === ListItems.ADMIT_CARDS && <AdmitCardFragment/>}
                        {selectedDrawerItem === ListItems.HISTORY && <HistoryFragment/>}
                        
                    </MainContentWrapper>

                </Box>
            </main>
        </>
    )
}

export default Dashboard 