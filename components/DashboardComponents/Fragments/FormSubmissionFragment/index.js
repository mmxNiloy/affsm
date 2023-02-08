import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Select from '@mui/material/Select'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Acknowledgements from './Acknowledgements'
import Information from './Information'
import CourseSelection from './CourseSelection'
import Confirmation from './Confirmation'

const steps = [
    'Acknoledgements',
    'Course Selection',
    'Information',
    'Confirmation',
]

const FormSubmissionFragment = ({hidden, user}) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [acknowledgementsFormError, setAcknowledgementsFormError] = useState(true)
    const [couseSelectionFormError, setCouseSelectionFormError] = useState(true)
    const [informationFormError, setInformationFormError] = useState(true)
    const [confirmationFormError, setConfirmationFormError] = useState(true)
    
    const [allottedHall, setAllottedHall] = useState('')
    const [semester, setSemester] = useState('')

    const [nameOfFather, setNameOfFather] = useState('')
    const [nameOfMother, setNameOfMother] = useState('')
    
    const handleAcknowledgementsFormChange = (hall, sem) => {
        setAllottedHall(hall)
        setSemester(sem)
    }

    const handleInformationFormChange = (ftName, mtName) => {
        setNameOfFather(ftName)
        setNameOfMother(mtName)
    }

    const handleNextStep = () => {
        if(currentStep === steps.length - 1) {
            console.log('Done button clicked')
            return
        }
        
        // ! IMPORTANT: Validate the form first before proceeding to the next step
        if(!validate()) {
            alert('Please fill up the required fields first.');
            return
        }

        setCurrentStep(currentStep + 1)
    }

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1)
    }

    const validate = () => {
        var flag = true
        const arr = [
            acknowledgementsFormError, 
            couseSelectionFormError, 
            informationFormError, 
            confirmationFormError
        ]

        for(let i = 0 ; i <= currentStep ; i++) {
            flag = Boolean(flag & !arr[i])
        }

        return flag
    }

    return(
        <Box hidden={hidden}>
            <Stack 
            spacing={1}
            direction='column'
            sx={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image src='/cu_logo.svg' height={128} width={86} alt='CU Logo'/>
                <Typography variant='h4'>University of Chittagong</Typography>
            </Stack>

            {/* TODO: Render actual form fragments */}
            <Box sx={{minHeight: '50vh', marginY: '16px', p: '32px'}}>
                <Acknowledgements 
                onChange={handleAcknowledgementsFormChange}
                onError={setAcknowledgementsFormError}
                hidden={currentStep !== 0}
                user={user}/>
                
                <CourseSelection
                onError={setCouseSelectionFormError}
                hidden={currentStep !== 1}
                user={user}/>
                
                <Information
                onChange={handleInformationFormChange}
                hidden={currentStep !== 2}
                onError={setInformationFormError}
                user={user}/>

                <Confirmation 
                data={{allottedHall, semester, nameOfFather, nameOfMother}}
                hidden={currentStep !== 3}
                onError={setConfirmationFormError}
                user={user}/>
            </Box>

            {/* Stepper for the form fillup steps */}
            <Box>
                <Stack 
                direction='row'
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Button disabled={currentStep === 0}
                    type='button' 
                    startIcon={<ArrowBackIosNewIcon/>} 
                    variant='contained'
                    onClick={handlePreviousStep}>
                        Back
                    </Button>
                    
                    <Button 
                    disabled={!validate()}
                    type="button" 
                    endIcon={<NavigateNextIcon/>}
                    variant='contained'
                    onClick={handleNextStep}>
                        {currentStep === steps.length - 1 ? 'Done' : 'Next'}
                    </Button>
                </Stack>

                <Stepper sx={{marginTop: '16px'}} activeStep={currentStep}>
                    {steps.map((item, index) => (
                        <Step key={`form_step_${index}`}>
                            <StepLabel>
                                {item}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            
        </Box>
    )

}

export default FormSubmissionFragment