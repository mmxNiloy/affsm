import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

const SubmissionsSkeleton = () => {
    return (
        <Card elevation={4}>
            <CardContent>
                <Stack direction='column' spacing={1}>
                    <Skeleton 
                    variant='text' 
                    height={'48px'} 
                    width={'80%'}
                    sx={{
                        alignSelf: 'center',
                        justifySelf: 'center',
                    }}/>

                    <Skeleton 
                    variant='text' 
                    width={'60%'}
                    sx={{
                        alignSelf: 'center',
                        justifySelf: 'center',
                    }}/>
                </Stack>

                <Stack 
                spacing={1}
                direction='column' 
                sx={{marginTop: '16px'}}>
                    <Skeleton 
                    variant='text' 
                    width={'35%'}/>
                    
                    <Skeleton 
                    variant='text'
                    width={'50%'}/>

                    <Skeleton 
                    variant='text'
                    width={'50%'}/>
                    
                    <Skeleton 
                    variant='text'
                    width={'50%'}/>

                    <Skeleton 
                    variant='text'
                    width={'50%'}/>
                </Stack>

                <Stack
                spacing={1}
                direction='column' 
                sx={{marginTop: '16px'}}>
                    <Skeleton 
                        variant='rectangle' 
                        height={'200px'}/>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default SubmissionsSkeleton