import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const hallNames = [
    'Shaheed Abdur Rab Hall',
    'Sheikh Hasina Hall',
    'AF Rahman Hall',
    'Shahjalal Hall',
    'Shaheed Shaharawardy Hall',
    'Master da Shurja Sen Hall',
    'Preetilata Hall',
    // Add names of the hall here
]

const semesters = [1, 2, 3, 4, 5, 6, 7, 8,]

const Acknowledgements = ({hidden, user, onError}) => {
    const router = useRouter()
    const [acknowledgement, setAcknowledgement] = useState(false)

    const handleAcknowledgementChange = (e) => {
        setAcknowledgement(e.target.checked)
    }

    const validate = () => {
        if(!acknowledgement) {
            onError(true)
            return false
        } else {
            onError(false)
            return true
        }
    }

    useEffect(() => {
        validate()
    }, [acknowledgement])

    const toCardinal = (num) => {
        // Limited to 1-9
        switch(num) {
            case 1:
                return '1st'
            case 2:
                return '2nd'
            case 3:
                return '3rd'
            default:
                return num + 'th'
        }
    }

    

    return (
        <Stack 
        direction="column"
        spacing={2} 
        sx={{
            display: (!hidden ? 'flex' : 'none'),
        }}>

            <Grid 
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{
                display: (!hidden ? 'flex' : 'none'),
            }}>
                <Grid item xs={12}>
                    <Typography variant='h4' textAlign={'center'}>Acknoledgements</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography 
                    variant='h5'
                    marginBottom={4}
                    textAlign='center'>
                        {`${toCardinal(user.semester ? user.semester : 0)} semester exam, ${(new Date()).getFullYear()}`}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {/* TODO: Set up margin, padding, height width here */}
                    <FormControl fullWidth>
                        <TextField 
                        label='Student ID' 
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.student_id ? user.student_id : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField
                        label='Session'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.session ? `${user.session - 1} - ${user.session}` : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField
                        label='Allotted Hall'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.allotted_hall ? `${user.allotted_hall} Hall` : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Department'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.department_name ? user.department_name : ''}/>
                    </FormControl>
                </Grid>
            </Grid>

            <Typography variant='h5' textAlign={'center'}>Application</Typography>

            {/* Application of acknowledgement */}
            <Container>
                <Typography variant='h6'>Exam Controller</Typography>
                <Typography variant='body1'>University of Chittagong, Chittagong</Typography>

                <Typography variant='body1' sx={{marginTop: '8px'}}>Sir,</Typography>
                <Typography variant='body2'>
                    I request your permission to participate in the upcoming {toCardinal(user.semester ? user.semester : 0)} semester BSc Engineering exam of {(new Date()).getFullYear()}. 
                    I pledge that I'll oblige to the decisions made by the officials.
                </Typography>

                <Typography variant='body1' sx={{marginTop: '8px'}}>Sincerely,</Typography>
                <Typography variant='h6'>{`${user.first_name} ${user.last_name}`}</Typography>
            </Container>
            
            <Container sx={{marginTop: '16px'}}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={handleAcknowledgementChange} 
                        checked={acknowledgement}/>
                    }
                    label="I confirm correctness of the data and agree to the T&C set out by the academy."/>
                </FormGroup>
            </Container>
            
        </Stack>
    )
}

export default Acknowledgements