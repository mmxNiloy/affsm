import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DataGrid } from '@mui/x-data-grid'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'


const SubmissionsPreviewDialog = ({
        open, onClose, user, 
        dialogData, isAdmin, onApprove, 
        onReject, disabled
    }) => {
    const [pageSize, setPageSize] = useState(10)
    
    const cols = [
        {field: 'course_code', headerName: 'Course Title', width: 160, type: 'string'},
        {field: 'course_title', headerName: 'Course Title', width: 360, type: 'string'},
        {field: 'semester', headerName: 'Semester', width: 160, type: 'number'},
        {field: 'type', headerName: 'Type', width: 160, type: 'string'},
    ]

    useEffect(() => {
        console.log("SubmissionsPreviewDialog > User found", user)
    }, [])
    
    return (
        <Dialog 
        maxWidth='lg'
        open={open}
        onClose={onClose}>
            {/* Dialog Content */}
            <DialogTitle>
                {dialogData.title}
            </DialogTitle>

            <Grid container rowSpacing={2} columnSpacing={2} sx={{ padding: '16px' }}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        value={(user && user.last_name && user.first_name) ? `${user.first_name} ${user.last_name}` : ''}
                        label='Name of the Applicant' 
                        InputProps={{
                            readOnly: true,
                        }}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Student ID' 
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.student_id ? user.student_id : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Department'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.department_name ? user.department_name : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    {/* Get the starting date of the exam from the internet */}
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                            label='Exam date'
                            inputFormat='DD/MM/YYYY'
                            disabled
                            onChange={() => {}}
                            value={(new Date(new Date() + 14 * 24 * 3600 * 1000))}
                            renderInput={(params) => <TextField InputProps={{readOnly: 'true'}} {...params} />}/>
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Session'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.session ? `${user.session - 1} - ${user.session}` : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    {/* Store these data in the database and read it from the db */}
                    <FormControl fullWidth>
                        <TextField 
                        value={user.name_of_father ? user.name_of_father : ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        label="Father's Name" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        value={user.name_of_mother ? user.name_of_mother : ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        label="Mother's Name" />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Allotted Hall'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={user.hall_name ? `${user.hall_name} Hall` : ''}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Permanent Address'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={dialogData.permanentAddress}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Current Address'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={dialogData.currentAddress}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <FormControl fullWidth>
                        <TextField 
                        label='Contact'
                        InputProps={{
                            readOnly: true,
                        }}
                        value={dialogData.contact}/>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {/* Show the selected courses */}
                    <Typography variant='h6' textAlign='center'>Selected Courses</Typography>
                    <Box height={'60vh'}>
                        <DataGrid 
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        rowsPerPageOptions={[10, 15, 20]}
                        columns={cols}
                        rows={dialogData.courses ? dialogData.courses : []}/>
                    </Box>
                    
                </Grid>

                <Grid item xs={4} sx={{
                    display: (Boolean(isAdmin) ? 'flex' : 'none')
                }}>
                    <Button type='button' variant='contained' fullWidth>
                        Export as PDF
                    </Button>

                </Grid>

                <Grid item xs={4} sx={{
                    display: (Boolean(isAdmin) ? 'flex' : 'none')
                }}>
                    <Button 
                    type='button' 
                    variant='contained' 
                    fullWidth 
                    color='success'
                    onClick={() => {
                        
                         onApprove(dialogData.form_id, dialogData.clearance_level)
                    }}
                    disabled={disabled}>
                        Approve
                    </Button>

                </Grid>

                <Grid item xs={4} sx={{
                    display: (Boolean(isAdmin) ? 'flex' : 'none')
                }}>
                    <Button 
                    type='button' 
                    variant='contained' 
                    fullWidth 
                    color='error'
                    onClick={onReject}
                    disabled={disabled}>
                        Reject
                    </Button>

                </Grid>

            </Grid>
            
        </Dialog>
    )
}

export default SubmissionsPreviewDialog