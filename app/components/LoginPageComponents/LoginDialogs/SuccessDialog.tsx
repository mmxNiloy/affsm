import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const SuccessDialog = ({open, onClose}) => {
    return (
        <Dialog
        maxWidth='md'
        open={open}
        onClose={onClose}>
            <DialogTitle>
                <Stack
                direction='row'
                spacing={1}
                sx={{
                    alignItems: 'center', 
                }}>
                    <CheckCircleOutlineIcon color={'success'}/>

                    <Typography variant={'h5'} color='success.main'>
                        Success
                    </Typography>

                    <Box flexGrow={1}/>

                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
            </DialogTitle>

            {/* We can define the dialog body here */}
            <DialogContent>
                <DialogContentText>
                    Successfully logged in. Redirecting to the dashboard, please wait.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant='contained' onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SuccessDialog