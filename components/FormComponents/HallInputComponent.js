import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

const HallInputComponent = () => {
    const [hallName, setHallName] = useState('')
    const handleHallNameChange = (e) => {
        setHallName(e.target.value)
    }

    const [rollNumber, setRollNumber] = useState(16000001)
    const [rollError, setRollError] = useState(false)
    const [rollErrorMessage, setRollErrorMessage] = useState('')

    const hallNames = ['Hall A', 'Hall B', 'Hall C', 'Hall D' ,'Hall E' ,'Hall F' ,'Hall G' ,'Hall H' ,'Hall I' ,'Hall J' ,'Hall K']

    const [session, setSession] = useState('2015-2016')

    const handleRollNumberChange = (e) => {
        // Validation here
        const roll = Number.parseInt(e.target.value + '')
        if(roll < 1600_0001 || roll > 9999_9999) {
            setRollError(true)
            setRollErrorMessage('Invalid roll number.')
            setSession('Indeterminate')
        } else {
            setRollError(false)
            setRollErrorMessage('')
            const x = Number.parseInt((roll / 1000_000))
            setSession(`20${x - 1}-20${x}`)
        }

        setRollNumber(roll)
    }

    return (
        <Container>
            <Stack direction='column' spacing={2}>
                <Typography variant='caption'>Hall Input Component</Typography>
                
                <FormControl fullWidth>
                    <InputLabel id='in_lbl_hall_select'>Select your hall</InputLabel>
                    <Select 
                    value={hallName} 
                    onChange={handleHallNameChange} 
                    label='Select your hall'
                    labelId='in_lbl_hall_select'>
                        {hallNames.map((value, index) => {
                            return (
                                <MenuItem value={value} key={index}>{value}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <TextField 
                type='number' 
                label='Roll number' 
                error={rollError}
                helperText={rollErrorMessage}
                fullWidth 
                value={rollNumber}
                onChange={handleRollNumberChange}/>
                <TextField type='text' label='Session' fullWidth disabled value={session}/>
            </Stack>
            
        </Container>
    )
}

export default HallInputComponent