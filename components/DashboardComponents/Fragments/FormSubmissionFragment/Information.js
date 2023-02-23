import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'

//                                      YY > ddd > hh > ssss > ms
const minDate = new Date(new Date() - 16 * 365 * 24 * 3600 * 1000)
const absoluteMinDate = new Date(minDate - 20 * 365 * 24 * 3600 * 1000)

const Information = ({onError, hidden, user, permanentAddress, currentAddress, contact, onPermanentAddressChange, onCurrentAddressChange, onContactChange }) => {
    const [dateOfBirth, setDateOfBirth] = useState(dayjs(minDate))
    const [checked, setChecked] = useState(false)

    const [contactError, setContactError] = useState(false)
    const [contactErrorMessage, setContactErrorMessage] = useState('')

    const handlePermanentAddressChange = (e) => {
        onPermanentAddressChange(e.target.value)
    }

    const handleCurrentAddressChange = (e) => {
        onCurrentAddressChange(e.target.value)
    }
    
    const handleDateOfBirthChange = (newDate) => {
        setDateOfBirth(newDate)
    }

    const handleContactChange = (e) => {
        // Ignore the inputs of length greater than 11
        const str = e.target.value + ''
        if(str.length > 10) return;

        // get rid of the decimal places
        var num = Number.parseInt(str)
        
        // get rid of the negative numbers
        num = Math.max(0, num)

        if(str.length < 10) {
            setContactError(true)
            setContactErrorMessage('Invalid phone number')
        } else {
            setContactError(false)
            setContactErrorMessage('')
        }

        onContactChange(num)
    }

    const handleCheckboxChange = (e) => {
        setChecked(e.target.checked)
    }

    const validate = () => {
        // TODO: An extrnsive validation is necessary
        if(
            permanentAddress.length > 0 &&
            currentAddress.length > 0 && contact.toString().length > 0 &&
            Boolean(dateOfBirth) && checked && !contactError
        ) onError(false)
        else onError(true)
    }

    useEffect(() => {
        validate()
    }, [
        permanentAddress,
        currentAddress, contact,
        dateOfBirth, checked, contactError
    ])

    return (
        <Grid 
        container 
        rowSpacing={2} 
        columnSpacing={2}
        sx={{
            display: (!hidden ? 'flex' : 'none'),
        }}>
            <Grid item xs={12}>
                <Typography variant='h4' textAlign={'center'}>Personal Information</Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={(user && user.last_name && user.first_name) ? `${user.first_name} ${user.last_name}` : ''}
                    label='Name of the Applicant' 
                    InputProps={{
                        readOnly: true,
                    }}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={user.name_of_mother ? user.name_of_mother : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Mother's Name" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={user.name_of_guardian ? user.name_of_guardian : ''}
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Guardian's Name" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                        label='Date of Birth'
                        inputFormat='DD/MM/YYYY'
                        value={dateOfBirth}
                        maxDate={minDate}
                        minDate={absoluteMinDate}
                        onChange={handleDateOfBirthChange}
                        renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={permanentAddress}
                    onChange={handlePermanentAddressChange}
                    label="Permanent Address" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={currentAddress}
                    onChange={handleCurrentAddressChange}
                    label="Current Address" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={contact}
                    error={contactError}
                    helperText={contactErrorMessage}
                    type='number'
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>+880</InputAdornment>
                    }}
                    onChange={handleContactChange}
                    label="Contact" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={user.nationality ? user.nationality : ''}
                    label='Nationality'
                    InputProps={{
                        readOnly: true,
                    }}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={user.ethnicity ? user.ethnicity : ''}
                    label='Ethnicity'
                    InputProps={{
                        readOnly: true,
                    }}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField
                    label='Religion'
                    value={user.religion ? user.religion : ''}
                    InputProps={{
                        readOnly: true,
                    }}/>
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
                    label="I confirm the correctness of the information and agree to the T&C set out by the academy."/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default Information