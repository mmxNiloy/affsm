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


const AdminDashboard = () => {
    const [loading, setLoading] = useState(false)
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [selectedDrawerItem, setSelectedDrawerItem] = useState(ListItems.DAHSBOARD)

    return (
        <Box>
            {/* Do not render these componenets if the user is null */}
            <MyAppBar 
            isAdmin={true}
            onDrawerChange={setDrawerOpen} 
            onDrawerItemChange={setSelectedDrawerItem}/>

            <MainContentWrapper open={isDrawerOpen}>
                {/* <MyCircularProgress loading={loading}/> */}
                TODO: Show content for admin
                
            </MainContentWrapper>

        </Box>
    )
}

export default AdminDashboard