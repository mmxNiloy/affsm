import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
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

const Acknowledgements = ({hidden, user, onError, onChange}) => {
    const router = useRouter()

    const [allottedHall, setAllottedHall] = useState('')
    const [selectedSemester, setSelectedSemester] = useState('')

    const [allottedHallError, setAllottedHallError] = useState(true)
    const [selectedSemesterError, setSelectedSemesterError] = useState(true)
    const [allottedHallErrorMessage, setAllottedHallErrorMessage] = useState('')
    const [selectedSemesterErrorMessage, setSelectedSemesterErrorMessage] = useState('')

    const handleHallChange = (e) => {
        setAllottedHall(e.target.value)
    }

    const handleSelectedSemesterChange = (e) => {
        setSelectedSemester(e.target.value)
    }

    const validate = () => {
        if(!Boolean(allottedHall) || allottedHall.length < 1 || !Boolean(selectedSemester) || selectedSemester.toString().length < 1) {
            onError(true)
            return false
        } else {
            onError(false)
            return true
        }
    }

    useEffect(() => {
        validate()
        onChange(allottedHall, selectedSemester)
    }, [allottedHall,selectedSemester])

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
                    <Stack 
                    marginBottom={4}
                    spacing={1}
                    direction='row'
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <FormControl sx={{
                            width: '200px'
                        }}>
                            <InputLabel id='lbl-sel-semester'>Select your semester</InputLabel>
                            <Select 
                            required
                            label='Select your semester'
                            labelId='lbl-sel-semester'
                            value={selectedSemester}
                            onChange={handleSelectedSemesterChange}>
                                {semesters.map(item => (
                                    <MenuItem value={item} key={`select_semester_${item}`}>
                                        {toCardinal(item)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant='h5'>{` semester exam, ${(new Date()).getFullYear()}`}</Typography>
                    </Stack>
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
                        {/* TODO: Modify the DB and acquire data from the DB according ly. Then render */}
                        <InputLabel id='lbl-sel-hall'>Select your alloted hall</InputLabel>
                        <Select
                        required
                        label='Select your alloted hall'
                        labelId='lbl-sel-hall' 
                        onChange={handleHallChange}
                        value={allottedHall}>
                            {hallNames.map((item, index) => (
                                <MenuItem 
                                key={`hall_select_${index}`}
                                value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Department'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.department_id ? user.department_id : ''}/>
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
                    I request your permission to participate in the upcoming {toCardinal(selectedSemester)} semester BSc Engineering exam of {(new Date()).getFullYear()}. 
                    I pledge that I'll oblige to the decisions made by the officials.
                </Typography>

                <Typography variant='body1' sx={{marginTop: '8px'}}>Sincerely,</Typography>
                <Typography variant='h6'>{`${user.first_name} ${user.last_name}`}</Typography>
            </Container>
        </Stack>
    )
}

export default Acknowledgements