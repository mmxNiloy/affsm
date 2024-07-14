import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyCircularProgress from '../../MyCircularProgress'
import EmptyList from '../../EmptyList'
import NoticePreviewFragment from '../NoticeFrags/NoticePreviewFragment'

const NoticeFragment = () => {
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [notices, setNotices] = useState([])

    const fetchNotices = async () => {
        if(loading) return;

        setLoading(true)

        // Code
        try {
            const req = await axios.get('/api/notices')

            setNotices(req.data.notices)

            if(req.data.notices.length < 1) setIsEmpty(true)
        } catch(err) {
            // Handle error here
            console.log('Notice Frags > NoticeFragment > fetchNotices() >', err.message)
        }

        setLoading(false)
    }

    const renderNotices = (item, index) => {
        return (
            <Grid item xs={6} key={`notice-grid-item-${index}`}>
                <NoticePreviewFragment data={{
                title: item.title,
                message: item.message,
                timestamp: item.time_stamp,
                first_name: item.first_name,
                last_name: item.last_name,
                department_name: item.department_name,
                notice_id: item.notice_id,
                }}
                viewable/>
            </Grid>
        )
    }

    useEffect(() => {
        fetchNotices()
    }, [])

    if(loading) return <MyCircularProgress/>

    return (
        <Grid container 
        rowSpacing={2} 
        columnSpacing={2} 
        padding={4}>
            <Grid item xs={12}>
                <Typography variant='h4' textAlign={'center'}>
                    All Notices
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <EmptyList hidden={!isEmpty}/>
            </Grid>

            {notices.map(renderNotices)}
        </Grid>
    )
}

export default NoticeFragment