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
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton'
import CardActionArea from '@mui/material/CardActionArea'
import Avatar from '@mui/material/Avatar'
import MailIcon from '@mui/icons-material/Mail';
import SubmissionsPreviewFragment from '../DashboardFragment/SubmissionsPreviewFragment'
import AdminFormsPreviewFragment from './AdminFormsPreviewFragment'

const AdminOverviewFragment = ({user}) => {
    const [loadingNotices, setLoadingNotices] = useState(false)
    const [loadingSubmissions, setLoadingSubmissions] = useState(false)
    const [emptySubmissions, setEmptySubmissions] = useState(false)
    const [notices, setNotices] = useState([])
    const [submissions, setSubmissions] = useState([])

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
            setNotices(data.data)
        } catch (ignored) {
            // Show an error alert dialog
            console.log('Dashboard > Overview > Notifications | Error', ignored)
        }

        

        setLoadingNotices(false)
    }

    const fetchSubmissions = async () => {
        if(loadingSubmissions) return

        setLoadingSubmissions(true)

        // API Call
        try {
            // Code
            const req = await axios.get('/api/forms/get_eval_forms', {
                params: {
                    limit: 3,
                    department: user.department_id,
                    role: user.evaluator_role
                }
            })

            setSubmissions(req.data.forms)

            if(req.data.forms.length < 1) setEmptySubmissions(true)
        } catch(err) {
            console.log("Data retrival error: " + err)
        }

        setLoadingSubmissions(false)
    }
    
    useEffect(() => {
        fetchNotices()
        fetchSubmissions()
    }, [])

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

    const getStatusCode = (clearance) => {
        if(clearance === 'none') return 1
        // TODO: Change code accordingly
        else return 2
    }

    const renderSubmissions = (item, index) => {
        const courses = item.courses
        const { 
            semester, time_stamp, permanent_address, 
            current_address, contact, clearance_level,
            department_id, student_id
        } = courses[0]

        return (
            <Box key={`submissions_preview_${index}`}>
                {/* TODO: Make a copy of this component
                    Rename the copied component accordingly, ie: AdminSubmissionsPreviewFragment
                    Show additional data such as who submitted the form, what is their ID, what their session is
                */}
                {/* The fuck is this shit? JS explain yourself */}
                {/* UsEr Is NoT DeFiNeD My ASS */}
                <AdminFormsPreviewFragment data={{
                title: `BSc Engineering of Semester ${semester}, Exam of ${(new Date(time_stamp).getFullYear())}`,
                timestamp: time_stamp,
                formStatus: getStatusCode(clearance_level),
                department: `Department of ${department_id}`,
                student_id
                }}/>
                <Divider/>
            </Box>
        )
    }

    return (
        <Grid container
        rowSpacing={2}
        columnSpacing={2}
        sx={{
            // TODO: Add a long component at the bottom to push the smaller components up
            minHeight: '100vh',
            padding: '16px'
        }}>
            <Grid item xs={12}>
                <Typography variant='h4'>
                    Greetings, {user.first_name}.
                </Typography>
                
                <Typography variant='body1'>
                    What's on your mind?
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Card>
                    <CardActionArea sx={{
                        padding: '16px'
                    }}>
                        <Stack 
                        direction='column'
                        spacing={1}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Avatar 
                            sx={{
                                height: '64px',
                                width: '64px',
                            }}
                            variant="rounded"
                            src='https://img.icons8.com/color/64/null/noticeboard.png'/>
                            
                            <Typography>
                                Post a notice
                            </Typography>
                        </Stack>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={4}>
                <Card>
                    <CardActionArea sx={{
                        padding: '16px'
                    }}>
                        <Stack 
                        direction='column'
                        spacing={1}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Avatar sx={{
                                height: '64px',
                                width: '64px',
                            }}
                            variant='rounded'
                            src={'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-form-contact-us-icons-flaticons-lineal-color-flat-icons.png'}/>
                            
                            <Typography>
                                View Forms
                            </Typography>
                        </Stack>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={4}>
                <Card>
                    <CardActionArea sx={{
                        padding: '16px'
                    }}>
                        <Stack 
                        direction='column'
                        spacing={1}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Avatar sx={{
                                height: '64px',
                                width: '64px',
                            }}
                            variant='rounded'
                            src={'https://img.icons8.com/color/64/null/add-user-group-woman-man-skin-type-7.png'}/>
                            
                            {/* For further integration */}
                            <Typography>
                                Add Students
                            </Typography>
                        </Stack>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={6}>
                <Card elevation={4}>
                    <CardHeader subheader={'Recent Notices'}/>
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
                {/* TODO: Show recent submitted form for the department the user works for */}
                <Card elevation={4}>
                    <CardHeader subheader={'Recent Submisssions'}/>
                    <CardContent hidden={!loadingSubmissions}>
                        <MyCircularProgress height={'30vh'}/>
                    </CardContent>

                    <CardContent hidden={loadingSubmissions}>
                        <Typography variant='h6'
                        sx={{
                            display: (emptySubmissions ? 'block' : 'none'),
                        }}>
                            No submissions were made.
                        </Typography>

                        <Stack direction={'column'} spacing={2}>
                            {submissions.map(renderSubmissions)}
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
        </Grid>
    )
}

export default AdminOverviewFragment