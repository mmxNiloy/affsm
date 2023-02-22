import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import EmptyList from '../../EmptyList'
import Divider from '@mui/material/Divider'
import AdminFormsPreviewFragment from './AdminFormsPreviewFragment'
import SubmissionsPreviewDialog from '../DashboardFragment/SubmissionsPreviewDialog'
const ActiveFormsFragment = ({user}) => {
    const [emptyForms, setEmptyForms] = useState(true)
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialogData, setDialogData] = useState({})
    const [open, setOpen] = useState(false)
    const [studentData, setStudentData] = useState({})

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
    const getStatusCode = (clearance) => {
        if(clearance === 'none') return 1
        // TODO: Change code accordingly
        else return 2
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
                title: `BSc Engineering of Semester ${semester}, Exam of ${(new Date(time_stamp).getFullYear())}`,
                timestamp: time_stamp,
                formStatus: getStatusCode(clearance_level),
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

    useEffect(() => {
        fetchForms()
    },[])

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
                isAdmin />

            </Grid>
            
        </Grid>
    )
}

export default ActiveFormsFragment









