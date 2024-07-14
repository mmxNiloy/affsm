import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography' 
import { useState } from 'react'
import axios from 'axios'

const NoticeDeleteDialog = ({open, onClose, dialogData, onDelete, deleteFlag}) => {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)

        // Send a request to the api
        try {
            const req = await axios.get('/api/notices/delete_notice', {
                params: {
                    notice_id: dialogData.notice_id
                }
            })

            if(req.status === 200) {
                onDelete(!deleteFlag)
            }
        } catch(err) {
            // Handle error here
            console.log('Admin Dashboard > PostedNotices > NoticeDeleteDialog > handleDelte() > ', err)
        }

        setLoading(false)
    }
    
    if(!Boolean(dialogData)) return null

    return (
        <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth={'md'}>
            <DialogTitle>
                Delete Notice
            </DialogTitle>

            <DialogContent>
                <Typography variant='body1'>
                    Are you sure you want to delete this notice?
                </Typography>

                <Typography>
                    Title: ${dialogData.title}
                </Typography>

                <Typography>
                    Message: <br/>
                    ${dialogData.message}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button  variant="contained"
                onClick={handleDelete} 
                disabled={loading}>
                    Yes
                </Button>

                <Button 
                onClick={onClose} variant="outlined"
                disabled={loading}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NoticeDeleteDialog