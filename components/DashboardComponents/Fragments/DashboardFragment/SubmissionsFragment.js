import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import SubmissionsPreviewDialog from './SubmissionsPreviewDialog'

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
    const [dialogData, setDialogData] = useState({})
    const handleDialogOpen = (data) => {
        const temp = {...data}
        const tempCourses = [...temp.courses]
        for(let i = 0; i < tempCourses.length; i++) {
            tempCourses[i] = {...tempCourses[i], id: `submission_${i}`}
        }

        temp.courses = tempCourses
        setDialogData(temp)
        setOpen(true)
        console.log('Modal Data', data)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    const renderForms = (item, index) => {
        const courses = [...item.courses]
        for(let i = 0; i < courses.length; i++) {
            var type = 'Improvement'
            if(courses[i].semester === user.semester) type = 'Regular'

            courses[i] = {...courses[i], type}
        }

        return (
            <Grid item xs={12} key={`submission_${index}`}>
                <SubmissionsPreviewFragment
                data={{
                    title: `BSc Engineering of Semester ${item.semester}, Exam of ${(new Date(item.time_stamp).getFullYear())}`,
                    timestamp: item.time_stamp,
                    permanentAddress: item.permanent_address,
                    currentAddress: item.current_address,
                    contact: item.contact,
                    formStatus: getStatusCode(item.clearance_level),
                    department: `Department of ${user.department_id}`,
                    courses
                }}
                clickable
                onShowDialog={handleDialogOpen}/>
            </Grid>
        )
    }
    
    useEffect(() => {
        getSubmissions()
    }, [])

    if(loading) return <MyCircularProgress height='60vh'/>

    return (
        <Box>
            <Grid container rowSpacing={2}>
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

            <SubmissionsPreviewDialog
            open={open}
            user={user}
            dialogData={dialogData}
            onClose={handleDialogClose}/>
        </Box>
        
    )
}

export default SubmissionsFragment