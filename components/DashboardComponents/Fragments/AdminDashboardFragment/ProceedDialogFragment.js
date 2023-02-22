import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

const ProceedDialogFragment = ({ open, onClose }) => {
  const [visible, setOpen] = useState(open);

  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    onClose(onClose);
  };

  return (
    <Grid container xs={6} alignItems="center">
      <Dialog open={visible} onClose={onClose} fullWidth maxWidth="xs">
        <Stack direction={"row"}>
          <DialogTitle>Proceed</DialogTitle>
          <Box flexGrow={1} />
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "red",
                cursor: "pointer",
                color: "white",
              },
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Stack direction={"row"}>
            <Button
              variant="outlined"
              style={{ marginRight: "30px", backgroundColor: "#CBEBF2" }}
              onClick={handleYes}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              style={{ marginRight: "10px", backgroundColor: "#FF9B9D" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ProceedDialogFragment;
