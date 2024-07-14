import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const MyCircularProgress = ({loading, height}) => {
    return (
        <Stack 
            spacing={4} 
            alignItems='center' 
            justifyContent='center'
            height={height ? height : '100vh'}
            hidden={!loading}>
                <CircularProgress size='128px' />
                <Typography textAlign={'center'} variant='h4'>Loading...</Typography>
        </Stack>
    )
}

export default MyCircularProgress