// What components you need
// 1. Stack [You know, good old Stack]
// 2. Stepper 
//  [The stepper will have no button. 
//  Not interactable, static stepper. 
//  Render value from property.][For viewing progress of the form]
// 3. Typography [For text]

import { Card,CardHeader,CardContent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stack from '@mui/material/Stack'

const SubmissionsPreviewFragment = ({user}) => {
    const steps = [
        'Select master blaster campaign settings',
        'Create an ad group',
        'Create an ad',
      ];
    return(
        <Grid container rowSpacing={2} columnSpacing={1}>
            <Stack direction='column' spacing={1}>
                <Card elevation={4}>
                    <CardHeader subheader={'title'} />
                    <CardContent>
                    
                    <Stack direction='column' spacing={1}>
                        {user.semester}th semester,{new Date().getFullYear()}
                        

                        <Stack direction='column' spacing={5}>
                        <Box sx={{ width: '100%' }}>
                             <Stepper activeStep={1} alternativeLabel>
                               {steps.map((label) => (
                                 <Step key={label}>
                                   <StepLabel>{label}</StepLabel>
                                 </Step>
                               ))}
                             </Stepper>
                        </Box>
                        </Stack>

                    </Stack>
                        

                        

                    </CardContent>

                </Card>
                               
            </Stack>

            

        </Grid>
        
        
        
    )
}
export default SubmissionsPreviewFragment