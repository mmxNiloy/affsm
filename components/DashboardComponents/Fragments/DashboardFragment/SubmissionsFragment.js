import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import SubmissionsPreviewDialog from './SubmissionsPreviewDialog'
import EmptyList from '../../EmptyList'

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
        const { 
            semester, time_stamp, permanent_address, 
            current_address, contact, clearance_level,
        } = courses[0]

        for(let i = 0; i < courses.length; i++) {
            var type = 'Improvement'
            if(courses[i].semester === user.semester) type = 'Regular'

            courses[i] = {...courses[i], type}
        }

        return (
            <Grid item 
            xs={12} sm={12} md={6} 
            lg={6} xl={6} 
            key={`submission_${index}`}>
                <SubmissionsPreviewFragment
                vertical
                data={{
                    title: `BSc Engineering of Semester ${semester}, Exam of ${(new Date(time_stamp).getFullYear())}`,
                    timestamp: time_stamp,
                    permanentAddress: permanent_address,
                    currentAddress: current_address,
                    contact: contact,
                    clearance_level,
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