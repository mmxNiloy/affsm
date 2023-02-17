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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import axios from "axios";
import SuccessDialog from "./LoginDialogs/SuccessDialog";


const LoginForm = ({onSuccess}) => {
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [userID, setUserID] = useState(0)
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState(UserTypes.STUDENT)

    const [uidError, setUidError] = useState(false)
    const [uidErrorText, setUidErrorText] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')
    const [idFieldLabel, setIdFieldLabel] = useState(UserTypes.STUDENT_ID_LABEL)
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

    const handleLoginButtonClick = async () => {
        setLoading(true)

        // rules/validations
        // student id must be a non-zero 8 digit number
        if(userID < 1000_0000 && userType === UserTypes.STUDENT) {
            setUidError(true)
            setUidErrorText('Student ID must be a non-zero 8 digit number')
            setLoading(false)
            return;
        } else {
            setUidError(false)
            setUidErrorText('')
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


        try {
            await axios.get(
                `/api/auth/login/${userType}`, 
                {
                    params: {
                        id: userID, 
                        password: password
                    }
                }
            )
        } catch(ignored) {
            setLoading(false)
            // TODO: Handle login error
            // Display a Dialog showing the error
            // Do not show any technical errors
            // Make it simple and user friendly
            // Material UI Components you will need, 
            // <Dialog></Dialog>
            // <DialogTitle></DialogTitle>
            // <Box></Box> or <Grid></Grid> or <Stack></Stack>
            // <Icon></Icon> or <IconButton></IconButton> or <Avatar></Avatar>
            // <Typography></Typography>
            // <Button></Button>
            return;
        }
        
        var ver;
        try {
            ver = await axios.get('/api/auth/verify')
        } catch(err) {
            // TODO: Make another dialog to show error message
            // Invalid token error
            alert('Invalid token')
            setLoading(false)
            return;
        }
        
        const user = ver.data.user
        
        if(Boolean(user)) {
            // TODO: Show a success message/dialog
            console.log('Successfully logged in.', user)
            // onSuccess()
            setOpenSuccessDialog(true)
        } else {
            setUidError(true)
            setPassError(true)
            setUidErrorText('Invalid ID or password')
            setPassErrorText('Invalid ID or password')
        }

        setLoading(false)
    }

    const handleSIDChange = (e) => {
        const id = e.target.value

        if(id > 9999_9999 || id < 0) {
            return
        }

        setUserID(id)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false)
        // Redirect to the dashboard
        onSuccess(userType === UserTypes.EVALUATOR)
    }

    const handleUserTypeChange = () => {
        const nextUser = getNextUserType()

        setUserType(nextUser)
        setIdFieldLabel(UserTypes[`${nextUser.toUpperCase()}_ID_LABEL`])
    }

    const getNextUserType = () => {
        if(userType === UserTypes.STUDENT) return UserTypes.EVALUATOR
        else return UserTypes.STUDENT
    }

    return (
        <Card sx={{ width: '400px' }} elevation={4}>
            <CardHeader 
            title='Welcome to AFFSM'/>

            <CardContent>
                
                <FormControl fullWidth error={uidError}>
                    <TextField 
                    label={idFieldLabel} 
                    variant="outlined"
                    error={uidError}
                    sx={{ marginX: '16px', marginY: '4px', width: '35ch', }}
                    type='number'
                    value={userID}
                    onChange={handleSIDChange}/>

                    <FormHelperText>{uidErrorText}</FormHelperText>
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

                <FormControl fullWidth>
                    <Typography variant='body1' textAlign={'center'}>
                        Are you a{userType === UserTypes.STUDENT ? 'n' : ''} {getNextUserType()}? 
                    </Typography>
                    <Typography variant='body1' textAlign='center'>
                        Try Logging in from
                        <Button 
                        onClick={handleUserTypeChange}
                        type='button' 
                        variant='text' 
                        sx={{ textDecoration: 'underline', marginLeft: '8px'}}>
                            Here
                        </Button>
                    </Typography>
                </FormControl>
                
                <Box hidden={!loading} sx={{marginX: '16px', marginY: '4px'}}>
                    <LinearProgress color={"success"}/>    
                </Box>
            </CardContent>

            <SuccessDialog 
            open={openSuccessDialog}
            onClose={handleSuccessDialogClose}/>
        </Card>
    )
}

const UserTypes = {
    STUDENT: 'student',
    EVALUATOR: 'evaluator',
    STUDENT_ID_LABEL: 'Student ID',
    EVALUATOR_ID_LABEL: 'Evaluator ID',
};

export default LoginForm;