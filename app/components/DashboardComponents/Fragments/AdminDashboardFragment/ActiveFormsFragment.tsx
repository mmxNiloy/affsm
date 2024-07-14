import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import EmptyList from '../../EmptyList'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import AdminFormsPreviewFragment from './AdminFormsPreviewFragment'
import SubmissionsPreviewDialog from '../DashboardFragment/SubmissionsPreviewDialog'
import ProceedDialogFragment from './ProceedDialogFragment'
import SubmissionSkeletonGrid from '../../SubmissionSkeletonGrid'
import { DataGrid } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'

const ActiveFormsFragment = ({user}) => {
    const [emptyForms, setEmptyForms] = useState(true)
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingApproval, setLoadingApproval] = useState(false)
    const [loadingRejection, setLoadingRejection] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const [dialogData, setDialogData] = useState({})
    const [open, setOpen] = useState(false)
    const [studentData, setStudentData] = useState({})
    /// Yakin
    const [openConfirmationDialog,setOpenConfirmationDialog] = useState(false)
    const [confirmationDialogMessage, setConfirmationDialogMessage] = useState(<>Do you want to proceed?</>)
    const [approvalFlag, setApprovalFlag] = useState(false)
    const [confirmationData, setConfirmationData] = useState({})

    const handleDialogOpen = (data, stuData) => {
        setDialogData(data)
        setStudentData(stuData)
        setOpen(true)
    }

    const handleDialogClose = () => {
        setOpen(false)
    }

    const fetchForms = async () => {
        if(loading) return

        setLoading(true)
        try{
            const req = await axios.get('/api/forms/get_eval_forms', {
                params : {
                    department: user.department_id,
                    role: user.evaluator_role
                }
            })

            const f = req.data.forms

            if(f.length < 1) setEmptyForms(true)
            else setEmptyForms(false)

            setForms(f)
            

        }catch(err){
            console.log('AdminDashboard > ActiveFormsFragment > fetchForms', err)
            
        }

        //request API
        setLoading(false)

    }

    /// Yakin
    const handleConfirmationDialogOpen = (msg) => {
        setOpenConfirmationDialog(true)
        setConfirmationDialogMessage(msg)
    }

    const handleConfirmationDialogClose = () => {
        setOpenConfirmationDialog(false)
    }

    const handleConfirm = async () => {
        console.log('Confirm button clicked')
        if(approvalFlag) await handleApproveForm(confirmationData.id, confirmationData.level)
        else await handleRejectForm(confirmationData.id, confirmationData.level)
    }

    const onApprove = (id, level) => {
        handleConfirmationDialogOpen(<>Do you want to <b>approve</b> this form?</>)
        setApprovalFlag(true)
        setConfirmationData({id, level})
    }

    const onReject = (id, level) => {
        handleConfirmationDialogOpen(<>Do you want to <b>reject</b> this form?</>)
        setApprovalFlag(false)
        setConfirmationData({id, level})
    }

    const handleApproveForm = async (id, level) => {

        setLoadingApproval(true)

        // Code
        try {
            await axios.get('/api/forms/approve_form', {
                params: {
                    form_id: id,
                    evaluator_id: user.evaluator_id,
                    clearance_level: level
                }
            })

            setIsUpdated(!isUpdated)
        } catch(err) {
            // Handle error here
            console.log("ActiveFormsFragment > handleApproveForm() > ", err)
        }

        setOpen(false)
        setOpenConfirmationDialog(false)
        setLoadingApproval(false)
    }

    const handleRejectForm = async (id, level) => {
        setLoadingRejection(true)
        
        // Code: Request the api to make an (negative) update
        console.log('Rejection form id', id)
        try {
            await axios.get('/api/forms/reject_form', {
                params: {
                    form_id: id
                }
            })

            setIsUpdated(!isUpdated)
        } catch(err) {
            // Handle error here
            console.log("Active form fragment > handleRejectForm() > ", err)
        }
        
        setLoadingRejection(false)
        setOpen(false)
        setOpenConfirmationDialog(false)
    }

    useEffect(() => {
        fetchForms()
    },[isUpdated])

    const [pageSize, setPageSize] = useState(20)

    const getFullName = (params) => {
        return `${params.row.first_name} ${params.row.last_name}`
    }

    const getSession = (params) => {
        return `${Number.parseInt(params.row.session) - 1}-${Number.parseInt(params.row.session)}`
    }
    const getFormStatus = (params) => {
        const c = Number.parseInt(params.row.clearance_level);

        switch(c) {
            case 1: return 'Submitted'
            case 2: return 'Dept'
            case 3: return 'Provost'
            case 4: return 'Account Office'
            case 5: return 'Bank'
            case 6: return 'Exam Controller'
            default: return 'Rejected'
        }
    }

    const renderViewButton = (params) => {
        return (
            <Button 
            type='button' 
            variant='contained'
            onClick={(e) => {
                e.stopPropagation();

                handleDialogOpen(params.row, params.row)
            }}>
                View
            </Button>
        )
    }

    const cols = [
        {
            field: 'form_id', 
            headerName: 'Form ID', 
            type: 'number',
        },
        {
            field: 'student_id',
            headerName: 'Student ID',
            type: 'string',
        },
        {
            field: 'fullName',
            headerName: 'Studnet\'s Name',
            type: 'string',
            valueGetter: getFullName,
            width: 200,
        },
        {
            field: 'session',
            headerName: 'Session',
            type: 'string',
            valueGetter: getSession,
        },
        {
            field: 'semester',
            headerName: 'Semester',
            type: 'number',
        },
        {
            field: 'department_name',
            headerName: 'Department',
            type: 'string',
            width: 200
        },
        
        {
            field: 'hall_name',
            headerName: 'Allotted Hall',
            type: 'string',
        },
        {
            field: 'contact',
            headerName: 'Contact',
            type: 'string',
            width: 156
        },
        {
            field: 'formStatus',
            headerName: 'Form Status',
            type: 'string',
            valueGetter: getFormStatus,
        },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: renderViewButton,
        }
    ]

    // if(loading) return <SubmissionSkeletonGrid/>
   
    return (
        <Grid container rowSpacing={2} columnSpacing={2} >
            <Grid item xs={12}>
                <Typography variant='h4' textAlign={'center'}>
                    Active Forms
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ height: '75vh' }}>
                <DataGrid
                columns={cols}
                loading={loading}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
                rowsPerPageOptions={[10, 20, 50]}
                rows={forms}
                getRowId={(row) => row.form_id}
                />
            </Grid>

            {/* {forms.map(renderForms)} */}

            <Grid item xs={12}>
                <EmptyList hidden={true}/>
            </Grid>

            <Grid item xs={12} >
                <SubmissionsPreviewDialog
                open={open}
                user={studentData}
                dialogData={dialogData}
                onClose={handleDialogClose}
                onApprove={onApprove}
                onReject={onReject}
                disabled={
                    Number.parseInt(user.clearance_level) !== Number.parseInt(dialogData.clearance_level) ||
                    loadingApproval || loadingRejection
                }
                isAdmin />

            </Grid>

            <ProceedDialogFragment
            loading={loadingApproval || loadingRejection}
            message={confirmationDialogMessage}
            open={openConfirmationDialog}
            onConfirm={handleConfirm}
            onClose={handleConfirmationDialogClose}/>
            {/* 
                TODO: Show an aditional dialog before approval or rejection of a form 
                Assigned to Yakin
            */}
            
        </Grid>
        
    )
}

export default ActiveFormsFragment