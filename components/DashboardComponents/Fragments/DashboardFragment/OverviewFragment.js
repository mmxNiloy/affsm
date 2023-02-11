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
import SubmissionsPreviewFragment from './SubmissionsPreviewFragment'

const OverviewFragment = ({user}) => {
    const [timeBangla, setTimeBangla] = useState(new Date() - 24*3600*1000);
    const [timeCSE, setTimeCSE] = useState(new Date() - 4 * 24*3600*1000);
    const [timePhysics, setTimePhysics] = useState(new Date() - 2 * 24*3600*1000);
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
                    <CardContent>
                        <Stack direction={'column'} spacing={2}>
                            {/* Notices has been populated using example data */}
                            <NoticePreviewFragment 
                            data={{
                                title: 'Department of Bangla: Exam Routine has been Published',
                                timestamp: timeBangla,
                                message: 'Exam routine for 7th semester of Department of Bangla has been published.\nStudents can download the routine from the given link.\nhttps://www.cu.ac.bd/routine/bangla/ba?sem=7'
                            }}/>

                            <NoticePreviewFragment 
                            data={{
                                title: 'Department of CSE: Exam Results has been delayed',
                                timestamp: timeCSE,
                                message: 'Due to extreme workload the processing of results is taking longer than expected. Students are asked to continue their future classes as scheduled.'
                            }}/>

                            <NoticePreviewFragment 
                            data={{
                                title: 'Department of Physics: Exam Results has been delayed',
                                timestamp: timePhysics,
                                message: 'The lab exams of the 3rd semester physics students will take place in two days. Please be weary of unusual time.'
                            }}/>
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
                    <CardContent>
                        <Stack direction={'column'} spacing={2}>
                            <SubmissionsPreviewFragment user={user}/>

                        </Stack>
                        


                    </CardContent>
                </Card>
            </Grid>
            
        </Grid>
    )
}

export default OverviewFragment