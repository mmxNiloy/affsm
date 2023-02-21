import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DataGrid } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import NotificationsIcon from '@mui/icons-material/Notifications';

const NoticePreviewDialog = ({user, open, onClose, dialogData}) => {
    if(!Boolean(dialogData)) return null

    return (
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth={'md'}>
            <DialogTitle>
                {dialogData.title}
                {/* TODO: Add an IconButton
                    You can use <Box flexGrow={1}/> to "push" the icon to the right side
                    The icon should be a close icon, ie windows "cross icon" [X]
                    You can find the icon in the mui icons website/documentation
                    Handle the click event.
                    Assigned to Sourov. 
                */}
            </DialogTitle>

            <Divider/>

            <DialogContent>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                            value={dialogData.department_name}
                            label="Department"
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                            value={`${dialogData.first_name} ${dialogData.last_name}`}
                            label="Posted by"
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                            value={(new Date(dialogData.timestamp)).toDateString()}
                            label="Posted on"
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                            value={dialogData.message}
                            label="Message"
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}/>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>

            {/* TODO: declare DialogActions. 
                Add a close button in the dialog actions component.
                Handle button click, close the dialog on click.
                Asigned to Sourov 
            */}
        </Dialog>
    )
}

export default NoticePreviewDialog