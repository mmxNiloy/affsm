import { Card,CardHeader,CardContent, CardActions } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stack from '@mui/material/Stack'
import StepContent from '@mui/material/StepContent'
import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AdminFormsPreviewFragment = ({data, clickable, onShowDialog, vertical}) => {
    const [studentData, setStudentData] = useState({})
    // TODO: Loading progress bar
    // Assigned to Ayesha
    // Ayesha: Set up a loading progress while the stuent data loads
    const [loading, setLoading] = useState(false)
    
    const steps = [
        {step: 'Provost', text: 'Awating approval from the provost.'},
        {step: 'Accounts Office', text: 'The form is being processed by the accounts office.'},
        {step: 'Bank', text: 'The form has been passed to the bank. Please pay your dues to proceed.'},
        {step: 'Exam Controller Office', text: 'The form is being finalized. You will receive your admit card soon.'},
    ]

    const handleViewButtonClick = () => {
        onShowDialog(data)
    }

    const renderStep = (item, index) => {
        return (
            <Step key={`submission-stepper-${index}`}>
                <StepLabel>
                    {item.step}
                </StepLabel>
                {vertical && <StepContent>
                    <Typography>
                        {item.text}
                    </Typography>
                </StepContent>}
            </Step>
        )
    }


    const fetchStudentInfo = async (id) => {
        const req = await axios.get('/api/students', {
            params: {
                id
            }
        })

        var data = req.data.student

        setStudentData(data)
    }

    useEffect(() => {
        fetchStudentInfo(data.student_id)
    })

    if(!Boolean(data)) return null
    
    // TODO: Loading progress bar
    // Assigned to Ayesha
    // If you want to hide the entire card render thee progress bar here
    // For instance, if(loading) reuturn <LinearProgress/>

    return(
        <Card elevation={4}>
            <CardContent>
                <Typography variant='h6' textAlign={'center'}>
                    {data.title}
                </Typography>
                
                <Typography variant='body1' textAlign={'center'}>
                    {`Date Submitted: ${new Date(data.timestamp).toDateString()}`}
                </Typography>

                <Typography variant='h6'>
                    Submitted By
                </Typography>

                {/* TODO: Loading progress bar, assigned to Ayesha */}
                {/* If you don't want to hide the entire card set up a conditional rendering here */}
                {/* For instance, {loading && <LinearProgress/>} */}
                {/* Make sure to hide the unloaded componets that way */}
                {/* IE: {!loading && <YourComponents/>} */}
                {/* You are free to style the components any way you like */}
                {/* DO NOT MAKE IT LOOK CRINGE */}
                {/* OTHERWISE I'LL DIE OF CRINGE */}
                <Typography variant='body1'>
                    Full name: {`${studentData.first_name} ${studentData.last_name}`}
                </Typography>

                <Typography variant='body1'>
                    Session: {`${studentData.session - 1}-${studentData.session}`}
                </Typography>

                {/* You can convert this semester numeric into a cardinal numeric */}
                <Typography variant='body1'>
                    Semester: {studentData.semester}
                </Typography>

                <Typography variant='body1'>
                    Allotted Hall: {studentData.hall_name} Hall
                </Typography>

                <Stepper 
                sx={{
                    marginTop: '32px'
                }}
                orientation={vertical ? 'vertical' : 'horizontal'}
                activeStep={data.formStatus - 1} 
                alternativeLabel={!vertical}>
                    {[
                        {step: 'Submitted', text: 'The form has been received and will be processed by the evaulators soon.'}, 
                        {step: data.department, text: `The ${data.department} has received your form. It is being processed.`}, 
                        ...steps].map(renderStep)}
                </Stepper>

                <CardActions sx={{ marginTop: '8px', display: (clickable ? 'flex' : 'none')}}>
                    <Button type='button' variant='contained' disabled={data.formStatus !== 7}>
                        Download Admit Card
                    </Button>

                    <Box flexGrow={1}/>

                    <Button type='button' variant='contained' onClick={handleViewButtonClick}>
                        View
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default AdminFormsPreviewFragment