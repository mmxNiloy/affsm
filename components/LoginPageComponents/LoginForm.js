import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button'
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box"
import axios from "axios";


const LoginForm = ({onSuccess}) => {
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [studentID, setStudentID] = useState(0)
    const [password, setPassword] = useState('')

    const [sidError, setSidError] = useState(false)
    const [sidErrorText, setSidErrorText] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    const handleLoginButtonClick = async () => {
        setLoading(true)

        // rules/validations
        // student id must be a non-zero 8 digit number
        if(studentID < 1000_0000) {
            setSidError(true)
            setSidErrorText('Student ID must be a non-zero 8 digit number')
            setLoading(false)
            return;
        } else {
            setSidError(false)
            setSidErrorText('')
        }

        if(password.length < 8) {
            setPassError(true)
            setPassErrorText('Password must be at least 8 characters long')
            setLoading(false)
            return;
        } else {
            setPassError(false)
            setPassErrorText('')
        }

        const req = await axios.get(`/api/auth/login/student?id=${studentID}&password=${password}`)
        const ver = await axios.get('/api/auth/verify')
        const user = ver.data.user
        
        if(Boolean(user)) {
            console.log('Successfully logged in.', user)
            onSuccess()
        } else {
            setSidError(true)
            setPassError(true)
            setSidErrorText('Invalid ID or password')
            setPassErrorText('Invalid ID or password')
        }

        setLoading(false)
    }

    const handleSIDChange = (e) => {
        const id = e.target.value

        if(id > 9999_9999 || id < 0) {
            return
        }

        setStudentID(id)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Card sx={{ width: '400px' }} elevation={4}>
            <CardHeader 
            title='Welcome to AFFSM'/>

            <CardContent>
                
                <FormControl fullWidth error={sidError}>
                    <TextField 
                    label='Student ID' 
                    variant="outlined"
                    error={sidError}
                    sx={{ marginX: '16px', marginY: '4px', width: '35ch', }}
                    type='number'
                    value={studentID}
                    onChange={handleSIDChange}/>

                    <FormHelperText>{sidErrorText}</FormHelperText>
                </FormControl>

                <FormControl fullWidth 
                error={passError} 
                sx={{ marginX: '16px', marginY: '4px', width: '35ch' }} 
                variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handlePasswordChange}
                            value={password}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />

                        <FormHelperText>{passErrorText}</FormHelperText>
                </FormControl>

                <FormControl fullWidth>
                    <Button
                    disabled={loading}
                    onClick={handleLoginButtonClick} 
                    sx={{ marginX: '16px', marginY: '8px', }} 
                    type='submit' 
                    variant="contained">
                        Log in
                    </Button>
                </FormControl>
                
                <Box hidden={!loading} sx={{marginX: '16px', marginY: '4px'}}>
                    <LinearProgress color={"success"}/>    
                </Box>
            </CardContent>
        </Card>
    )
}

export default LoginForm;