import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Button from "@mui/material/Button";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const ProceedDialogFragment = ({ open, onClose, onConfirm, message, loading }) => {
  return (
    <Dialog 
    open={open} 
    onClose={onClose} 
    fullWidth 
    maxWidth="xs">
      <DialogTitle>
        <Stack
        direction='row'
        spacing={1}
        sx={{
          alignItems: 'center',
        }}>
          <Typography variant='h6'>
            Proceed?
          </Typography>

          <Box flexGrow={1}/>

          <IconButton
          onClick={onClose}>
            <CloseIcon color='error'/>
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack 
        direction={'column'}
        spacing={1}>
          <Typography variant='body1' paragraph>
            {Boolean(loading) && <>Loading flag is active</>}
            {Boolean(message) ? message : <>Are you sure?</>}
          </Typography>

          <Box hidden={!Boolean(loading)}>
            <Typography 
            textAlign='center' 
            variant='body2'>
              Loading, please wait...
            </Typography>

            <LinearProgress/>
          </Box>
          
        </Stack>
        
      </DialogContent>

      <DialogActions>
        <Stack 
        direction={"row"}
        spacing={1}
        padding={1}>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={loading}
            color={'success'}>
            Yes
          </Button>

          <Button
            variant="contained"
            onClick={onClose}
            disabled={loading}
            color='error'>
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ProceedDialogFragment;
