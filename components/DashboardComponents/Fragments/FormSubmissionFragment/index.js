import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
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
import axios from 'axios'
import { useRouter } from 'next/router'

const steps = [
    'Acknoledgements',
    'Course Selection',
    'Information',
    'Confirmation',
]

const FormSubmissionFragment = ({user}) => {
    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(0)
    const [acknowledgementsFormError, setAcknowledgementsFormError] = useState(true)
    const [couseSelectionFormError, setCouseSelectionFormError] = useState(true)
    const [informationFormError, setInformationFormError] = useState(true)
    const [confirmationFormError, setConfirmationFormError] = useState(true)
    const [currentAddress, setCurrentAddress] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [contact, setContact] = useState(0)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedCourses, setSelectedCourses] = useState([])

    const handleFormSubmit = async () => {
        // Create a new form record in the database
        try {
            const req = await axios.post('api/forms/post_form', {
                student_id: user.student_id,
                semester: user.semester,
                selectedCourses: selectedCourses,
                contact: contact,
                current_address: currentAddress,
                permanent_address: permanentAddress
            })

            alert('Successfully submitted the form. You can view the form in the submission tab.')
            router.reload()
        } catch(ignored) {
            // Handle error here
            console.log('Database Error: ')
        }
    }

    const handleNextStep = async () => {
        if(currentStep === steps.length - 1) {
            console.log('Done button clicked')
            
            await handleFormSubmit()
            
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

    

    const getCourses = async () => {
        if(loading) return

        setLoading(true)

        // code
        var req = null
        var temp = []
        try {
            req = await axios.get('/api/courses', {
                params: {
                    semester: user.semester,
                    department: user.department_id,
                }
            })
            temp = req.data.courses
            for(let i = 0; i < temp.length; i++) {
                temp[i] = {
                    ...temp[i], 
                    id: i + 1, 
                    type: (user.semester > temp[i].semester ? 'Improvement' : 'Regular'),
                }
            }

            setCourses(temp)
        } catch(ignored) {
            // Handle error here
            console.log('FormSubmissionFragment > Course Selection', ignored)
        }

        setLoading(false)
    }

    useEffect(() => {
        // Get courses here
        getCourses()
    }, [])

    return(
        <Box>
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
                onError={setAcknowledgementsFormError}
                hidden={currentStep !== 0}
                user={user}/>
                
                <CourseSelection
                onError={setCouseSelectionFormError}
                hidden={currentStep !== 1}
                courses={courses}
                selectedCourses={selectedCourses}
                onCourseSelect={setSelectedCourses}/>
                
                <Information
                hidden={currentStep !== 2}
                onError={setInformationFormError}
                contact={contact}
                permanentAddress={permanentAddress}
                currentAddress={currentAddress}
                onContactChange={setContact}
                onPermanentAddressChange={setPermanentAddress}
                onCurrentAddressChange={setCurrentAddress}
                user={user}/>

                {currentStep === 3 && <Confirmation 
                hidden={currentStep !== 3}
                onError={setConfirmationFormError}
                data={{contact, permanentAddress, currentAddress}}
                user={user}
                courses={selectedCourses}/>}
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
                        {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
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