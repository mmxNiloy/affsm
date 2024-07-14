import { useEffect, useState } from "react"
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Image from 'next/image'

const EmptyList = ({hidden}) => {
    const [vectorDir, setVectorDir] = useState('/empty_boxes_f.svg')

    useEffect(() => {
        const num = Math.random() < 0.5
        if(num) setVectorDir('/empty_boxes_m.svg')
        else setVectorDir('/empty_boxes_f.svg')
    }, [])

    if(hidden === true) return null

    return (
        <Stack 
        spacing={1} 
        direction='column'
        sx={{
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='h5' textAlign={'center'}>
                This is... surprisingly empty!
            </Typography>

            <Image src={vectorDir} alt='empty-list-vector' height={600} width={480}/>
        </Stack>
    )
}

export default EmptyList