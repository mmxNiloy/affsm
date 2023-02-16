import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import NoticePreviewFragment from '../NoticePreviewFragment'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'

const SubmissionsFragment = ({user}) => {
    const [loading, setLoading] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [emptySubmissions, setEmptySubmissions] = useState(false)

    const getSubmissions = async () => {
        if(loading) return

        setLoading(true)

        try {
            const req = await axios.get('/api/forms', {
                params: {
                    id: user.student_id
                }
            })
            setSubmissions(req.data.forms)

            if(req.data.forms.length === 0) {
                // Set empty flag
                setEmptySubmissions(true)
            }
        } catch (err) {
            // Handle error here
            console.log('Data error: ', err)
        }

        setLoading(false)
    }

    const getStatusCode = (clearance) => {
        if(clearance === 'none') return 1
        // TODO: Change code accordingly
        else return 2
    }

    const [open, setOpen] = useState(false)

    const handleShowModal = () => {
        setOpen(true)
    }

    const renderForms = (item, index) => {
        return (
            <Grid xs={12} key={`submission_${index}`}>
                <SubmissionsPreviewFragment
                data={{
                    title: `BSc Engineering of Semester ${item.semester}, Exam of ${(new Date(item.time_stamp).getFullYear())}`,
                    timestamp: item.time_stamp,
                    formStatus: getStatusCode(item.clearance_level),
                    department: `Department of ${user.department_id}`
                }}
                clickable
                onShowDialog={handleShowModal}/>
            </Grid>
        )
    }
    
    useEffect(() => {
        getSubmissions()
    }, [])

    if(loading) return <MyCircularProgress height='60vh'/>

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4' textAlign={'center'}>
                        All Submissions
                    </Typography>
                </Grid>

                {submissions.map(renderForms)}

                <Grid item xs={12} sx={{display: (emptySubmissions ? 'flex' : 'none')}}>
                    <Typography variant='h5' textAlign={'center'}>
                        You have not submitted a form yet. Make a submission to view your records here.
                    </Typography>
                </Grid>
            </Grid>

            <Dialog 
            open={open}
            onClose={() => { setOpen(false) }}>
                {/* Dialog Content */}
                <DialogTitle></DialogTitle>
            </Dialog>
        </Box>
        
    )
}

export default SubmissionsFragment