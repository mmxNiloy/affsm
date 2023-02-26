import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import SubmissionsPreviewDialog from './SubmissionsPreviewDialog'
import EmptyList from '../../EmptyList'
import SubmissionSkeletonGrid from '../../SubmissionSkeletonGrid'

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
                    id: user.student_id,
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

    const [open, setOpen] = useState(false)
    const [dialogData, setDialogData] = useState({})
    const handleDialogOpen = (data) => {
        setDialogData(data)
        setOpen(true)
        console.log('Modal Data', data)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    const renderForms = (item, index) => {
        return (
            <Grid item 
            xs={12} sm={12} md={6} 
            lg={6} xl={6} 
            key={`submission_${index}`}>
                <SubmissionsPreviewFragment
                vertical
                data={item}
                clickable
                onShowDialog={handleDialogOpen}/>
            </Grid>
        )
    }
    
    useEffect(() => {
        getSubmissions()
    }, [])

    if(loading) return <SubmissionSkeletonGrid/>

    return (
        <Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h4' textAlign={'center'}>
                        All Submissions
                    </Typography>
                </Grid>

                {submissions.map(renderForms)}

                <Grid item xs={12}>
                    <EmptyList hidden={!emptySubmissions}/>
                </Grid>
            </Grid>

            <SubmissionsPreviewDialog
            open={open}
            user={user}
            dialogData={dialogData}
            onClose={handleDialogClose}/>
        </Box>
        
    )
}

export default SubmissionsFragment