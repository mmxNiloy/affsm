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
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const Confirmation = ({user, onError, hidden, data}) => {
    const [checked, setChecked] = useState(false)

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked)
    }

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

    const validate = () => {
        if(!checked) {
            onError(true)
            return true
        } else {
            onError(false)
            return false
        }
    }

    useEffect(() => {
        validate()
    }, [checked])

    return (
        <Grid 
        container 
        columnSpacing={2} 
        columns={12} 
        rowSpacing={2}
        sx={{display: (!hidden ? 'flex' : 'none')}}>
            <Grid item xs={12}>
                <Typography variant='h4' textAlign={'center'}>
                    {toCardinal(user.semester ? user.semester : 0)} semester BSc Engineering Exam, {(new Date()).getFullYear()}
                </Typography>
            </Grid>

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

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Checkbox 
                        onChange={handleCheckboxChange} 
                        checked={checked}/>
                    }
                    label="I confirm correctness of the information and agree to the T&C set out by the academy."/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default Confirmation