import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import NoticePreviewFragment from '../NoticeFrags/NoticePreviewFragment'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider'
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'

const OverviewFragment = ({user, toSubmissions, toNotices}) => {
    const [loadingNotices, setLoadingNotices] = useState(false)
    const [notices, setNotices] = useState([])
    const [openSnack, setOpenSnack] = useState(false)

    const handleOpenSnack = () => {
        setOpenSnack(true)
    }

    const handleCloseSnack = () => {
        setOpenSnack(false)
    }

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

    const renderForms = (item, index) => {
        return (
            <SubmissionsPreviewFragment 
            key={`submissionsPreview_${index}`}
            data={item}/>
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
                            variant='contained' onClick={handleOpenSnack}>
                                Request Edit Access
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                            variant='contained'
                            onClick={toNotices}>
                                View All
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                variant='contained'
                                onClick={toSubmissions}>
                                    View All
                                </Button>
                            </CardActions>
                        </Stack>
                    </CardContent>
                </Card>

                <Grid item xs={12}>
                <Snackbar open={openSnack}
                autoHideDuration={2000}
                onClose={handleCloseSnack}
                message={"This feature will be availabe after the admission processing system gets online."}
                action={
                    <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnack}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }/>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

export default OverviewFragment