import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect } from 'react';

const placeholderText = 
`
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
`

const NoticePreviewFragment = ({data}) => {
    useEffect(() => {}, [])
    return (
        <Stack
        direction='row'
        spacing={2}>
            <Avatar>
                <NotificationsIcon/>
            </Avatar>

            <Stack direction='column' spacing={1}>
                <Typography variant='h6'>
                    {(data && data.title) ? data.title : 'Empty Title'}
                </Typography>

                <Typography variant='body2'>
                    {(data && data.timestamp) ? (new Date(data.timestamp)).toDateString() : 'Empty Timestamp'}
                </Typography>

                <Typography variant='body1' paragraph 
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3,
                }}>
                    {(data && data.message) ? data.message : placeholderText}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default NoticePreviewFragment