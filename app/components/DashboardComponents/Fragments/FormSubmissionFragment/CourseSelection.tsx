import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import MyCircularProgress from '../../MyCircularProgress'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const CourseSelection = ({onError, hidden, courses, onCourseSelect, selectedCourses}) => {
    const [loading, setLoading] = useState(false)
    const [coursesConfirmation, setCoursesConfirmation] = useState(false)
    const [pageSize, setPageSize] = useState(10)

    const handleCoursesConfirmationChange = (e) => {
        const val = e.target.checked
        setCoursesConfirmation(e.target.checked)
        if(!val || !selectedCourses.length) {
            onError(true)
            return false
        } else {
            onError(false)
            return true
        }
    }

    const handleSelectionModelChange = (model) => {
        const temp = []
        for(let i = 0 ; i < model.length ; i++) {
            const course = courses[model[i] - 1]
            temp.push({...course})
            temp[i].id = `sel_${i}`
        }

        onCourseSelect(temp)
    }

    const cols = [
        {field: 'id', headerName: 'ID', width: 160, type: 'number'},
        {field: 'course_code', headerName: 'Course Title', width: 160, type: 'text'},
        {field: 'course_title', headerName: 'Course Title', width: 360, type: 'text'},
        {field: 'semester', headerName: 'Semester', width: 160, type: 'number'},
        {field: 'type', headerName: 'Type', width: 160, type: 'text'},
    ]
    
    return (
        <Box hidden={hidden}>
            <Box>
                {/* Table for exam courses */}
                <Container sx={{
                    height: '60vh'
                }}>
                    <DataGrid
                    onSelectionModelChange={handleSelectionModelChange}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                    rowsPerPageOptions={[10, 15, 20]}
                    checkboxSelection={true}
                    loading={loading}
                    columns={cols}
                    rows={courses}/>
                </Container>
                <Container sx={{marginTop: '16px'}}>
                    <FormGroup>
                        <FormControlLabel
                        control={
                            <Checkbox 
                            disabled={!selectedCourses.length}
                            onChange={handleCoursesConfirmationChange} 
                            checked={coursesConfirmation}/>
                        }
                        label="I confirm the correctness of the data and agree to the T&C set out by the academy."/>
                    </FormGroup>
                </Container>
            </Box>

            
        </Box>
    )
}

export default CourseSelection