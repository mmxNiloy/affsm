// What components you need
// 1. Stack [You know, good old Stack]
// 2. Stepper 
//  [The stepper will have no button. 
//  Not interactable, static stepper. 
//  Render value from property.][For viewing progress of the form]
// 3. Typography [For text]

import { Card,CardHeader,CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'

const SubmissionsPreviewFragment = ({data}) => {
    const steps = [
        'Provost',
        'Accounts Office',
        'Bank',
        'Exam Controller Office'
    ]

    const renderStep = (item, index) => {
        return (
            <Step key={`submission-stepper-${index}`}>
                <StepLabel>{item}</StepLabel>
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
                activeStep={data.formStatus - 1} 
                alternativeLabel>
                    {['Submitted', data.department, ...steps].map(renderStep)}
                </Stepper>
            </CardContent>
        </Card>
    )
}
export default SubmissionsPreviewFragment