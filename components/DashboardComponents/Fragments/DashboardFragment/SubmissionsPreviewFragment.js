// What components you need
// 1. Stack [You know, good old Stack]
// 2. Stepper 
//  [The stepper will have no button. 
//  Not interactable, static stepper. 
//  Render value from property.][For viewing progress of the form]
// 3. Typography [For text]

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
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

const SubmissionsPreviewFragment = ({data, clickable, onShowDialog, vertical}) => {
    const steps = [
        {step: 'Provost', text: 'Awating approval from the provost.'},
        {step: 'Accounts Office', text: 'The form is being processed by the accounts office.'},
        {step: 'Bank', text: 'The form has been passed to the bank. Please pay your dues to proceed.'},
        {step: 'Exam Controller Office', text: 'The form is being finalized. You will receive your admit card soon.'},
    ]

    const [open, setOpen] = useState(false)

    const handleSnackbarOpen = () => {
        setOpen(true)
    }

    const handleSnackbarClose = () => {
        setOpen(false)
    }

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

    const handleDownloadAdmit = () => {
        handleSnackbarOpen()
    }

    const renderStepper = () => {
        if(data.clearance_level === 0) {
            return (
                <Stack direction='row' spacing={1} sx={{
                    alignItem: 'center',
                    justifyContent: 'center',
                }}>
                    <InfoIcon color='error'/>
                    
                    <Typography variant='body1' color='error'>
                        Form Rejected
                    </Typography>
                </Stack>
            )
        }

        return (
            <Stepper 
            sx={{
                marginTop: '32px'
            }}
            orientation={vertical ? 'vertical' : 'horizontal'}
            activeStep={data.clearance_level} 
            alternativeLabel={!vertical}>
                {[
                    {step: 'Submitted', text: 'The form has been received and will be processed by the evaulators soon.'}, 
                    {step: data.department_name, text: `The ${data.department_name} has received your form. It is being processed.`}, 
                    ...steps].map(renderStep)}
            </Stepper>
        )
    }

    return(
        <Card elevation={4}>
            <CardContent>
                <Typography variant='h6' textAlign={'center'}>
                    {data.title}
                </Typography>
                
                <Typography variant='body1' textAlign={'center'}>
                    {`Date Submitted: ${new Date(data.time_stamp).toDateString()}`}
                </Typography>

                {renderStepper()}

                <CardActions sx={{ marginTop: '8px', display: (clickable ? 'flex' : 'none')}}>
                    <Button 
                    type='button' 
                    variant='contained' 
                    disabled={data.clearance_level < 6}
                    href={`/pdf/admit/${data.form_id}`}
                    target='_blank' 
                    onClick={handleDownloadAdmit}>
                        Download Admit Card
                    </Button>

                    <Box flexGrow={1}/>

                    <Button type='button' variant='contained' onClick={handleViewButtonClick}>
                        View
                    </Button>
                </CardActions>
            </CardContent>

            <Snackbar open={open}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            message={"Exporting to PDF. Please allow popups to view the document."}
            action={
                <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }/>
        </Card>
    )
}
export default SubmissionsPreviewFragment