import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'
import StyledTab from './StyledTab'
import OverviewFragment from './OverviewFragment'
import SubmissionsFragment from './SubmissionsFragment'
import PreferencesFragment from './PreferencesFragment'

const DashboardFragment = ({user, toggleTheme}) => {
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
                    <StyledTab label="Submissions" value={1} />
                    <Box flexGrow={1}/>
                    <StyledTab label="Preferences" value={2} />
                </Tabs>
            </Box>

            {currentTab === 0 && <OverviewFragment user={user}/>}
            {currentTab === 1 && <SubmissionsFragment user={user}/>}
            {currentTab === 2 && <PreferencesFragment toggleTheme={toggleTheme}/>}
        </Box>
        
    )
}

export default DashboardFragment