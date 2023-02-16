import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DataGrid } from '@mui/x-data-grid'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
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
    const [pageSize, setPageSize] = useState(10)
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
    const [modalData, setModalData] = useState({})
    const handleShowModal = (data) => {
        const temp = {...data}
        const tempCourses = [...temp.courses]
        for(let i = 0; i < tempCourses.length; i++) {
            tempCourses[i] = {...tempCourses[i], id: `submission_${i}`}
        }

        temp.courses = tempCourses
        setModalData(temp)
        setOpen(true)
        console.log('Modal Data', data)
    }

    const cols = [
        {field: 'course_code', headerName: 'Course Title', width: 160, type: 'text'},
        {field: 'course_title', headerName: 'Course Title', width: 360, type: 'text'},
        {field: 'semester', headerName: 'Semester', width: 160, type: 'number'},
        {field: 'type', headerName: 'Type', width: 160, type: 'text'},
    ]

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

            <Dialog 
            maxWidth='lg'
            open={open}
            onClose={() => { setOpen(false) }}>
                {/* Dialog Content */}
                <DialogTitle>
                    {modalData.title}
                </DialogTitle>

                <Grid container rowSpacing={2} columnSpacing={2} sx={{ padding: '16px' }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            value={(user && user.last_name && user.first_name) ? `${user.first_name} ${user.last_name}` : ''}
                            label='Name of the Applicant' 
                            InputProps={{
                                readOnly: true,
                            }}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Student ID' 
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user.student_id ? user.student_id : ''}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Department'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user.department_name ? user.department_name : ''}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {/* Get the starting date of the exam from the internet */}
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                label='Exam date'
                                inputFormat='DD/MM/YYYY'
                                disabled
                                onChange={() => {}}
                                value={(new Date(new Date() + 14 * 24 * 3600 * 1000))}
                                renderInput={(params) => <TextField InputProps={{readOnly: 'true'}} {...params} />}/>
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Session'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user.session ? `${user.session - 1} - ${user.session}` : ''}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        {/* Store these data in the database and read it from the db */}
                        <FormControl fullWidth>
                            <TextField 
                            value={user.name_of_father ? user.name_of_father : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Father's Name" />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            value={user.name_of_mother ? user.name_of_mother : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                            label="Mother's Name" />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Allotted Hall'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={user.allotted_hall ? `${user.allotted_hall} Hall` : ''}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Permanent Address'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={modalData.permanentAddress}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Current Address'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={modalData.currentAddress}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                            <TextField 
                            label='Contact'
                            InputProps={{
                                readOnly: true,
                            }}
                            value={modalData.contact}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        {/* Show the selected courses */}
                        <Typography variant='h6' textAlign='center'>Selected Courses</Typography>
                        <Box height={'60vh'}>
                            <DataGrid 
                            pageSize={pageSize}
                            onPageSizeChange={setPageSize}
                            rowsPerPageOptions={[10, 15, 20]}
                            columns={cols}
                            rows={modalData.courses ? modalData.courses : []}/>
                        </Box>
                        
                    </Grid>
                </Grid>
                
            </Dialog>
        </Box>
        
    )
}

export default SubmissionsFragment