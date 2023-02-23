import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import MyCircularProgress from '../../MyCircularProgress'
import ReplayIcon from '@mui/icons-material/Replay';
import SendIcon from '@mui/icons-material/Send';
import ProceedDialogFragment from '../AdminDashboardFragment/ProceedDialogFragment'
import axios from 'axios'

const NoticeSubmissionFragment = ({user, toNotices}) => {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [titleErrorMessage, setTitleErrorMessage] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [messageErrorMessage, setMessageErrorMessage] = useState('')
    const [messageError, setMessageError] = useState(false)

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    const resetForm = () => {
        setTitle('')
        setMessage('')
    }

    const openConfirmationDialog = () => {
        setOpen(true)
    }

    const closeConfirmationDialog = () => {
        setOpen(false)
    }

    const validate = () => {
        if(title.length < 1) {
            setTitleError(true)
            setTitleErrorMessage('Cannot submit a form with an empty title')
            return false
        } else if(message.length < 1) {
            setMessageError(true)
            setMessageErrorMessage('Cannot submit a form with an empty description')
            return false
        }

        setTitleError(false)
        setTitleErrorMessage('')

        setMessageError(false)
        setMessageErrorMessage('')

        return true
    }
    
    const handlePost = async () => {
        closeConfirmationDialog()
        setLoading(true)

        
        // Validation!!!
        if(!validate()) {
            closeConfirmationDialog()
            setLoading(false)
            return
        }

        try {
            await axios.post('/api/notices/insert', {
                title,
                message,
                user_id: user.evaluator_id,
            })

            console.log('Successfully posted the notice')

            // On success, redirect to the notices fragment
            toNotices()
        } catch(err) {
            console.log("NoticeSubmissionFrag > handlePost() > ", err)
        }

        setLoading(false)
    }

    if(!Boolean(user)) return <MyCircularProgress/>

    return (
        <Grid 
        container 
        rowSpacing={1}
        columnSpacing={1}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    Post a notice
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField 
                    label='Title'
                    value={title}
                    error={titleError}
                    helperText={titleErrorMessage}
                    onChange={handleTitleChange}
                    multiline
                    rows={2}/>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                    label='Description'
                    value={message}
                    onChange={handleMessageChange}
                    multiline
                    rows={16}/>
                </FormControl>
            </Grid>
            
            <Grid item xs={12}>
                <Box hidden={!loading}>
                    <LinearProgress/>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Button 
                fullWidth 
                variant='contained'
                onClick={openConfirmationDialog}
                disabled={loading}
                startIcon={<SendIcon/>}>
                    Post
                </Button>
            </Grid>


            <Grid item xs={6}>
                <Button 
                fullWidth 
                variant='contained'
                onClick={resetForm}
                disabled={loading}
                startIcon={<ReplayIcon/>}>
                    Reset
                </Button>
            </Grid>

            <Grid item xs={12}>
                <ProceedDialogFragment 
                open={open} 
                message={'Do you want to post the notice?'}
                onClose={closeConfirmationDialog}
                onConfirm={handlePost}/>
            </Grid>
        </Grid>
    )
}

export default NoticeSubmissionFragment