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

const CourseSelection = ({onError, hidden, user}) => {
    useEffect(() => {
        onError(false)
    }, [])
    
    return (
        <Box hidden={hidden}>
            <Typography>Course Selection | Work in progress</Typography>
        </Box>
    )
}

export default CourseSelection