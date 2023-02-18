import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
import StyledTab from '../DashboardFragment/StyledTab'
import AdminOverviewFragment from './AdminOverviewFragment'
import PostedNoticesFragment from './PostedNoticesFragment'
import PreferencesFragment from '../DashboardFragment/PreferencesFragment'
import ActiveFormsFragment from './ActiveFormsFragment'
const AdminDashboardFragment = ({user}) => {
    const [currentTab, setCurrentTab] = useState(0)
    const handleTabChange = (e, newTab) => {
        setCurrentTab(newTab)
    }
    
    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                value={currentTab} 
                onChange={handleTabChange}>
                    <StyledTab label="Overview" value={0} />
                    <StyledTab label="Posted Notices" value={1} />
                    <StyledTab label="Active Forms" value={2} />
                    <Box flexGrow={1}/>
                    <StyledTab label="Preferences" value={3} />
                </Tabs>

                {currentTab === 0 && <AdminOverviewFragment user={user}/>}
                {currentTab === 1 && <PostedNoticesFragment user={user}/>}
                {currentTab === 2 && <ActiveFormsFragment user={user}/>}
                {currentTab === 3 && <PreferencesFragment user={user}/>}
            </Box>
        </Box>
    )
}

export default AdminDashboardFragment