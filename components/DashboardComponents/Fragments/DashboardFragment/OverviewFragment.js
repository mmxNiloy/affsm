import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import NoticePreviewFragment from '../NoticeFrags/NoticePreviewFragment'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'

const OverviewFragment = ({user}) => {
    const [loadingNotices, setLoadingNotices] = useState(false)
    const [notices, setNotices] = useState([])

    const fetchNotices = async () => {
        if(loadingNotices) return

        setLoadingNotices(true)
        
        try {
            // Code
            const req = await axios.get('/api/notices', {
                params: {
                    limit: 3,
                }
            })

            const data = req.data
            setNotices(data.notices)
        } catch (ignored) {
            // Show an error alert dialog
            console.log('Dashboard > Overview > Notifications | Error', ignored)
        }

        

        setLoadingNotices(false)
    }

    const renderNotices = (item, index) => (
        <Box key={`notice_preview_${index}`}>
            <NoticePreviewFragment data={{
            title: item.title,
            message: item.message,
            timestamp: item.time_stamp
            }}/>
            <Divider/>
        </Box>
    )

    const [loadingSubmissions, setLoadingSubmissions] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [emptySubmissions, setEmptySubmissions] = useState(false)

    const getSubmissions = async () => {
        if(loadingSubmissions) return

        setLoadingSubmissions(true)

        try {
            const req = await axios.get('/api/forms', {
                params: {
                    id: user.student_id,
                    limit: 3,
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

        setLoadingSubmissions(false)
    }

    const getStatusCode = (clearance) => {
        if(clearance === 'none') return 1
        // TODO: Change code accordingly
        else return 2
    }

    const renderForms = (item, index) => {
        const courses = item.courses
        const { 
            semester, time_stamp, permanent_address, 
            current_address, contact, clearance_level,
        } = courses[0]

        return (
            <SubmissionsPreviewFragment key={`submissionsPreview_${index}`}
            data={{
                title: `BSc Engineering of Semester ${semester}, Exam of ${(new Date(time_stamp).getFullYear())}`,
                timestamp: time_stamp,
                formStatus: getStatusCode(clearance_level),
                department: `Department of ${user.department_id}`
            }}/>
        )
    }
    
    useEffect(() => {
        fetchNotices()
        getSubmissions()
    }, [])

    return (
        <Grid container 
        rowSpacing={2}
        columnSpacing={2}
        sx={{
            minHeight: '100vh',
            padding: '16px'
        }}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    Greetings, {user.first_name}.
                </Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Card elevation={4}>
                    <CardHeader subheader={'Profile'}/>
                    <CardContent>
                        <Grid container rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                Student's Name
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {`${user.first_name} ${user.last_name}`}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                Student ID
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {user.student_id}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                Department
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {user.department_name}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                Semester
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {user.semester}
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                Session
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                {`${user.session - 1}-${user.session}`}
                            </Grid>
                        </Grid>

                        <CardActions sx={{ marginTop: '8px'}}>
                            <Box flexGrow={1}/>
                            <Button 
                            startIcon={<EditIcon/>}
                            variant='contained'>
                                Request Edit Access
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
            
            <Grid item xs={6}>
                <Card elevation={4}>
                    <CardHeader subheader={'Notices'}/>
                    <CardContent hidden={!loadingNotices}>
                        <MyCircularProgress height={'30vh'}/>
                    </CardContent>

                    <CardContent hidden={loadingNotices}>
                        <Stack direction={'column'} spacing={2}>
                            {/* Notices has been populated using example data */}
                            {notices.map(renderNotices)}
                        </Stack>
                        

                        <CardActions sx={{ marginTop: '8px'}}>
                            <Box flexGrow={1}/>
                            <Button 
                            variant='contained'>
                                View All
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={6}>
                <Card elevation={4}>
                    <CardHeader subheader={'Submissions'}/>

                    <CardContent hidden={!loadingSubmissions}>
                        <MyCircularProgress height={'30vh'}/>
                    </CardContent>
                    
                    <CardContent hidden={loadingSubmissions}>
                        <Stack direction={'column'} spacing={2}>
                            {submissions.map(renderForms)}

                            <Typography variant='h6' textAlign='center' sx={{display: (emptySubmissions ? 'flex' : 'none')}}>
                            You have not submitted a form yet.
                            </Typography>
                            
                            <CardActions sx={{ marginTop: '8px'}}>
                                <Box flexGrow={1}/>
                                <Button 
                                variant='contained'>
                                    View All
                                </Button>
                            </CardActions>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            
        </Grid>
    )
}

export default OverviewFragment