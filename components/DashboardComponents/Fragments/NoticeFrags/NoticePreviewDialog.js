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
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
const NoticePreviewDialog = ({user, open, onClose, dialogData}) => {
    if(!Boolean(dialogData)) return null

    return (
        <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={'md'}>
            <DialogTitle>
                <Stack 
                direction='row' 
                spacing={1}
                sx={{
                    alignItems: 'center'
                }}>
                    <Typography variant='h6'>
                        {dialogData.title}
                    </Typography>

                    <Box flexGrow={1}/>
                    
                    <IconButton onClick={onClose}>
                        <CloseIcon color='error'/>
                    </IconButton>
                </Stack>
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