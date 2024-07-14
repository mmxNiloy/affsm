import Grid from '@mui/material/Grid'
import SubmissionsSkeleton from './SubmissionsSkeleton'

const SubmissionSkeletonGrid = () => {
    const arr = [1,2,3,4,5,6,7,8,9,10]

    return (
        <Grid container rowSpacing={2} columnSpacing={2}>
            {arr.map(ignored => (
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} key={ignored}>
                    <SubmissionsSkeleton/>
                </Grid>
            ))}
        </Grid>
    )
}

export default SubmissionSkeletonGrid