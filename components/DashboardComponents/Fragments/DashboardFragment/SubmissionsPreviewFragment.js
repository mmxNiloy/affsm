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
import { useEffect, useState } from 'react'

const SubmissionsPreviewFragment = ({data, clickable, onShowDialog, vertical}) => {
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

    return(
        <Card elevation={4}>
            <CardContent>
                <Typography variant='h6' textAlign={'center'}>
                    {data.title}
                </Typography>
                
                <Typography variant='body1' textAlign={'center'}>
                    {`Date Submitted: ${new Date(data.timestamp).toDateString()}`}
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
export default SubmissionsPreviewFragment