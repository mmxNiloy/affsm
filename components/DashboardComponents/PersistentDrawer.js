import { useTheme } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
import { ListItems } from './DashboardEnums'
import { useState } from 'react';

const PersistentDrawer = ({open, handleDrawerClose, onDrawerItemChange}) => {
    const theme = useTheme();
    const [selectedItem, setSelectedItem] = useState(ListItems.DAHSBOARD)

    const handleItemClick = (index) => {
        onDrawerItemChange(ListItems[`ITEM_${index + 1}`])
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
                    onClick={() => { 
                        onDrawerItemChange(ListItems.DAHSBOARD)
                        setSelectedItem(ListItems.DAHSBOARD) 
                    }}>
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

export default PersistentDrawer