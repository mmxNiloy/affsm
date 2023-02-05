import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DrawerHeader from './DrawerHeader';
import ListSubheader from '@mui/material/ListSubheader'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';

const PersistentDrawer = ({open, handleDrawerClose}) => {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState(ListItems.DAHSBOARD)

    const handleItemClick = (index) => {
        setSelectedItem(ListItems[`ITEM_${index + 1}`])
    }

    const formsListItems = [
        {
            text: 'Notices', 
            icon: <NotificationsIcon/>
        },
        {
            text: 'Submit a Form',
            icon: <MailIcon/>
        },
        {
            text: 'Active Forms',
            icon: <ContentPasteSearchIcon/>
        },
        {
            text: 'Admit Cards',
            icon: <InboxIcon/>
        },
        {
            text: 'History',
            icon: <HistoryIcon/>
        }
    ]

    return (
        <Drawer
        sx={{
          width: theme.measurements.drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: theme.measurements.drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton 
                    selected={selectedItem === ListItems.DAHSBOARD}
                    onClick={() => { setSelectedItem(ListItems.DAHSBOARD) }}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            
            <List>
                <ListSubheader>
                    Forms
                </ListSubheader>
            {formsListItems.map((item, index) => (
                <ListItem key={`form_list_item_${index}`} disablePadding>
                    <ListItemButton 
                    selected={selectedItem === ListItems[`ITEM_${index + 1}`]}
                    onClick={() => { handleItemClick(index) }}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />

            {/* List item indeces are offset by the length of the forms list items array */}
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton 
                    selected={selectedItem === ListItems[`ITEM_${index + formsListItems.length + 1}`]}
                    onClick={() => {handleItemClick(index + formsListItems.length)}}>
                        <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
    )
}

// TODO: Give proper names for the enum items
const ListItems = {
    DAHSBOARD: 0,
    ITEM_1: 1,
    ITEM_2: 2,
    ITEM_3: 3,
    ITEM_4: 4,
    ITEM_5: 5,
    ITEM_6: 6,
    ITEM_7: 7,
    ITEM_8: 8,
    ITEM_9: 9,
    ITEM_10: 10,
}

export default PersistentDrawer