import DialogActions from "@mui/material/DialogActions" 
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle  from "@mui/material/DialogTitle"
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"

const FailureDialog = ({open, onClose}) =>{
    return (
        <Dialog 
        maxWidth={"md"} 
        open = {open}
        onClose={onClose} >
            <DialogTitle >
                <Stack 
                direction='row' 
                spacing={1} 
                sx={{alignItems:'center'}}>
                    <BlockOutlinedIcon color={"error"}/>

                    <Typography variant={"h5"} color={"error.main"}>
                        Failure
                    </Typography>

                    <Box flexGrow={1}/>

                    <IconButton onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Invalid user ID or password. Please enter your ID and password again.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button 
                variant='contained' 
                onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default FailureDialog;