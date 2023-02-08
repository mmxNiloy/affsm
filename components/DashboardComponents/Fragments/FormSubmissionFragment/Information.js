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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

//                                      YY > ddd > hh > ssss > ms
const minDate = new Date(new Date() - 16 * 365 * 24 * 3600 * 1000)
const absoluteMinDate = new Date(minDate - 20 * 365 * 24 * 3600 * 1000)

// List of religion options
const religions = [
    'Atheism',
    'Buddhism',
    'Christianity',
    'Hinduism',
    'Islam',
    'Judaism',
    'Shikhism',
    'Shintoism',
    'Taoism',
]

const Information = ({onError, hidden, user, onChange}) => {
    const [nameOfFather, setNameOfFather] = useState('')
    const [nameOfMother, setNameOfMother] = useState('')
    const [nameOfGuardian, setNameOfGuardian] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(dayjs(minDate))
    const [nationality, setNationality] = useState('')
    const [religion, setReligion] = useState('')
    const [ethnicity, setEthnicity] = useState('')
    const [contact, setContact] = useState('')

    const handleNameOfFatherChange = (e) => {
        setNameOfFather(e.target.value)
    }

    const handleNameOfMotherChange = (e) => {
        setNameOfMother(e.target.value)
    }

    const handleNameOfGuardianChange = (e) => {
        setNameOfGuardian(e.target.value)
    }

    const handlePermanentAddressChange = (e) => {
        setPermanentAddress(e.target.value)
    }

    const handleCurrentAddressChange = (e) => {
        setCurrentAddress(e.target.value)
    }
    
    const handleDateOfBirthChange = (newDate) => {
        setDateOfBirth(newDate)
    }

    const handleNationalityChange = (e) => {
        setNationality(e.target.value)
    }

    const handleReligionChange = (e) => {
        setReligion(e.target.value)
    }

    const handleEthnicityChange = (e) => {
        setEthnicity(e.target.value)
    }

    const handleContactChange = (e) => {
        setContact(e.target.value)
    }

    const validate = () => {
        // TODO: An extrnsive validation is necessary
        if(
            nameOfFather.length > 0 && nameOfMother.length > 0 &&
            nameOfGuardian.length > 0 && permanentAddress.length > 0 &&
            currentAddress.length > 0 && contact.length > 0 &&
            Boolean(dateOfBirth) && nationality.length > 0 &&
            ethnicity.length > 0 && religion.length > 0
        ) onError(false)
        else onError(true)
    }

    useEffect(() => {
        validate()
        onChange(nameOfFather, nameOfMother)
    }, [
        nameOfFather, nameOfMother,
        nameOfGuardian, permanentAddress,
        currentAddress, contact,
        dateOfBirth, nationality,
        ethnicity, religion,
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
                    value={nameOfFather}
                    onChange={handleNameOfFatherChange}
                    label="Father's Name" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={nameOfMother}
                    onChange={handleNameOfMotherChange}
                    label="Mother's Name" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={nameOfGuardian}
                    onChange={handleNameOfGuardianChange}
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
                    onChange={handleContactChange}
                    label="Contact" />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={nationality}
                    label='Nationality'
                    onChange={handleNationalityChange}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <TextField 
                    value={ethnicity}
                    label='Ethnicity'
                    onChange={handleEthnicityChange}/>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                    <InputLabel id='lbl-sel-religion'>Select your religion</InputLabel>
                    <Select
                    labelId='lbl-sel-religion'
                    label='Select your religion'
                    value={religion}
                    onChange={handleReligionChange}>
                        {religions.map((item, index) => (
                            <MenuItem value={item} key={`religion_select_${index}`}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default Information