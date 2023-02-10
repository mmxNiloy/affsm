import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

const CourseSelection = ({onError, hidden, user}) => {
    useEffect(() => {
        onError(false)
    }, [])
    
    return (
        <Box hidden={hidden}>
            <Typography>Course Selection | Work in progress</Typography>
        </Box>
    )
}

export default CourseSelection