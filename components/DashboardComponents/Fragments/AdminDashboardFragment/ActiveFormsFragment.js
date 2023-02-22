import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import EmptyList from '../../EmptyList'
import Divider from '@mui/material/Divider'
import AdminFormsPreviewFragment from './AdminFormsPreviewFragment'
import SubmissionsPreviewDialog from '../DashboardFragment/SubmissionsPreviewDialog'
import ProceedDialogFragment from './ProceedDialogFragment'
const ActiveFormsFragment = ({user}) => {
    const [emptyForms, setEmptyForms] = useState(true)
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingApproval, setLoadingApproval] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const [dialogData, setDialogData] = useState({})
    const [open, setOpen] = useState(false)
    const [studentData, setStudentData] = useState({})
    ///Yakin
    const [openConfirmationDialog,setOpenConfirmationDialog] = useState(false)

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

    const renderForms = (item, index) => {
    
        const courses = item.courses
        const { 
            semester, time_stamp, permanent_address, 
            current_address, contact, clearance_level,
            department_id, student_id
        } = courses[0]

        return (
            <Grid item
            xs={12} sm={12} md={12} lg={6} xl={6}
            key={`submissions_preview_${index}`}>
                {/* TODO: Make a copy of this component
                    Rename the copied component accordingly, ie: AdminSubmissionsPreviewFragment
                    Show additional data such as who submitted the form, what is their ID, what their session is
                */}
                {/* The fuck is this shit? JS explain yourself */}
                {/* UsEr Is NoT DeFiNeD My ASS */}

                <AdminFormsPreviewFragment 
                vertical 
                onShowDialog={handleDialogOpen}
                clickable
                data={{
                    form_id: item.form_id,
                    title: `BSc Engineering of Semester ${semester}, Exam of ${(new Date(time_stamp).getFullYear())}`,
                    timestamp: time_stamp,
                    clearance_level,
                    department: `Department of ${department_id}`,
                    student_id,
                    permanentAddress: permanent_address,
                    currentAddress: current_address,
                    contact,
                    courses
                }}/>
            </Grid>
        )

    }
    ///Yakin
    const handleConfirmationDialogOpen = ()=>{
        setOpenConfirmationDialog(true)
       
    }
    const handleConfirmationDialogClose = ()=>{
        setOpenConfirmationDialog(false)
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

        setLoadingApproval(false)
    }

    const handleRejectForm = (id) => {
        // Code: Request the api to make an (negative) update
    }

    useEffect(() => {
        fetchForms()
    },[isUpdated])

    if(loading) return <MyCircularProgress height='60vh' />
   
    return (
        <Grid container rowSpacing={2} columnSpacing={2} >
            <Grid item xs={12}>
                <Typography variant='h4' textAlign={'center'}>
                    Active Forms
                </Typography>
            </Grid>

            {forms.map(renderForms)}

            <Grid item xs={12}>
                <EmptyList hidden={!emptyForms}/>
            </Grid>

            <Grid item xs={12} >
                <SubmissionsPreviewDialog
                open={open}
                user={studentData}
                dialogData={dialogData}
                onClose={handleDialogClose}
                 onApprove={handleApproveForm}
            //    onApprove={ProceedDialogFragment}
                onReject={handleRejectForm}
                disabled={
                    Number.parseInt(user.clearance_level) !== Number.parseInt(dialogData.clearance_level) ||
                    loadingApproval
                }
                isAdmin />

            </Grid>

            <ProceedDialogFragment
            open={true}
            onClose={handleConfirmationDialogOpen}/>
            {/* 
                TODO: Show an aditional dialog before approval or rejection of a form 
                Assigned to Yakin
            */}
            
        </Grid>
        
    )
}

export default ActiveFormsFragment