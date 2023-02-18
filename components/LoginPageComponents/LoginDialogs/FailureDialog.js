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
const FailureDialog = ({open,onClose}) =>{
    return (
        <Dialog maxWidth={"md"} fullWidth
            open = {open}
            onClose={onClose} >
            <DialogTitle >
                    <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                    <BlockOutlinedIcon color={"#b71c1c"}/>
                    <Typography variant={"h5"} color={"#b71c1c"}>
                        Failed
                    </Typography>
                    <Box flexGrow={1}></Box>
                    <CloseIcon />
                    </Stack>
                   </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Log in failed. Try again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={onClose} color="secondary" >
                        Close
                    </Button>
                </DialogActions>
        </Dialog>
    )
}
export default FailureDialog;