import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'

const NoticeEditDialog = ({open, onClose, dialogData, onEditSuccess, editFlag}) => {
    if(!Boolean(dialogData)) return null

    const [title, setTitle] = useState(dialogData.title)
    const [message, setMessage] = useState(dialogData.message)

    const [loading, setLoading] = useState(false)
    const handleUpdate = async () => {
        // Code
        if(loading) return

        setLoading(true)

        // Code: make api request
        try {
            const req = await axios.post('/api/notices/update_notice', {
                notice_id: dialogData.notice_id,
                title,
                message
            })

            if(req.status === 200) {
                // Code handle success and reload maybe?
                onEditSuccess(!editFlag)
            } else {
                // Show an error alert or something
            }
        } catch(err) {
            console.log('Admin dashboard > PostedNoticesFragment > NoticeEditDialog> handleUpdate() > ', err)
        }

        setLoading(false)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {}, [])

    return (
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth={'md'}>
            <DialogTitle>
                Title: {title}
            </DialogTitle>

            <Divider/>

            <DialogContent>
                <Grid 
                container 
                rowSpacing={2}
                padding={1}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Title'
                            maxRows={4}
                            multiline
                            onChange={handleTitleChange}
                            value={title}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Message'
                            maxRows={8}
                            multiline
                            onChange={handleMessageChange}
                            value={message}/>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant='contained' onClick={handleUpdate} disabled={loading}>
                    Update
                </Button>

                <Button variant='contained' onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>    
    )
}

export default NoticeEditDialog