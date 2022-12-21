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

    const handleShowIconButtonClick = () => {
        setShowIcon(!showIcon)
    }

    const handleLoginButtonClick = () => {
        console.log('Student ID: ' + studentID + ', password: ' + password)
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