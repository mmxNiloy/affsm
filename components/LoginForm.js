import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button'
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Visibility from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
    const [showIcon, setShowIcon] = useState(false)
    const [studentID, setStudentID] = useState(0)
    const [password, setPassword] = useState('')

    const [sidError, setSidError] = useState(false)
    const [sidErrorText, setSidErrorText] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    const handleShowIconButtonClick = () => {
        setShowIcon(!showIcon)
    }

    const handleLoginButtonClick = async () => {
        // rules/validations
        // student id must be a non-zero 8 digit number
        if(studentID < 10_000_000 || studentID > 99_999_999) {
            setSidError(true)
            setSidErrorText('Student ID must be a non-zero 8 digit number')
            return;
        } else {
            setSidError(false)
            setSidErrorText('')
        }

        if(password.length < 8) {
            setPassError(true)
            setPassErrorText('Password must be at least 8 characters long')
            return;
        } else {
            setPassError(false)
            setPassErrorText('')
        }

        const req = await fetch(`/api/auth/login/student?id=${studentID}&password=${password}`)
        const res = await req.json()
        
        if(req.ok) {
            console.log('Successfully logged in.', res.user)
        } else {
            setSidError(true)
            setPassError(true)
            setSidErrorText('Invalid ID or password')
            setPassErrorText('Invalid ID or password')
        }
    }

    const handleSIDChange = (e) => {
        setStudentID(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Card sx={{ width: '512px' }}>
            <CardHeader 
            title='Login'
            subheader='Welcome to AFFSM' />

            <CardContent>
                <FormControl fullWidth>
                    <TextField 
                    label='Student ID' 
                    variant="outlined"
                    sx={{ margin: '16px' }}
                    type='number'
                    value={studentID}
                    onChange={handleSIDChange}/>
                    <Stack direction='row' sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField 
                        sx={{ margin: '16px', width: '80%' }} 
                        label='Password' 
                        variant="outlined" 
                        value={password}
                        onChange={handlePasswordChange}
                        type={showIcon ? 'text' : 'password'}/>

                        <IconButton onClick={handleShowIconButtonClick}>
                            {/* Conditional rendering */}
                            {showIcon ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                        
                    </Stack>
                    <Button onClick={handleLoginButtonClick} sx={{ margin: '16px' }} type='submit' variant="contained">Login</Button>
                </FormControl>
            </CardContent>
        </Card>
    )
}

export default LoginForm;