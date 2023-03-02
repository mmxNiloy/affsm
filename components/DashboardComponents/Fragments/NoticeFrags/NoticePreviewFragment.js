import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoticePreviewDialog from './NoticePreviewDialog'
import NoticeEditDialog from './NoticeEditDialog'
import NoticeDeleteDialog from './NoticeDeleteDialog'

const placeholderText = 
`
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
`

const NoticePreviewFragment = ({data, isAdmin, viewable, onEditSuccess, editFlag, deleteFlag, onDelete}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const onDialogClose = () => {
        setOpenDialog(false)
    }

    const onDialogOpen = () => {
        setOpenDialog(true)
    }

    const onEditDialogClose = () => {
        setOpenEditDialog(false)
    }

    const onEditDialogOpen = () => {
        setOpenEditDialog(true)
    }

    const onDeleteDialogOpen = () => {
        setOpenDeleteDialog(true)
    }

    const onDeleteDialogClose = () => {
        setOpenDeleteDialog(false)
    }

    useEffect(() => {}, [])
    return (
        <Box>
            <Card elevation={4}>
                <CardContent>
                    <Stack 
                    direction={'column'} 
                    spacing={2} 
                    sx={{
                        padding: '16px',
                    }}>
                        <Stack direction={'row'}
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                        }}>
                            <Avatar>
                                <NotificationsIcon/>
                            </Avatar>
                            
                            <Typography variant='h6' noWrap>
                                {(data && data.title) ? data.title : 'Empty Title'}
                            </Typography>
                        </Stack>

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
                </CardContent>

                <CardActions sx={{ padding: '16px'}}>
                    <Box hidden={!Boolean(isAdmin)}>
                        <Button 
                        variant='contained' 
                        type='button'
                        onClick={onEditDialogOpen}
                        startIcon={<EditIcon/>}>
                            Edit
                        </Button>
                    </Box>

                    <Box hidden={!Boolean(isAdmin)}>
                        <Button 
                        variant='contained' 
                        type='button'
                        color='error'
                        onClick={onDeleteDialogOpen}
                        startIcon={<DeleteIcon/>}>
                            Delete
                        </Button>
                    </Box>

                    <Box flexGrow={1}/>

                    <Box hidden={!Boolean(viewable)}>
                        <Button 
                        variant='contained' 
                        type='button'
                        startIcon={<VisibilityIcon/>}
                        onClick={onDialogOpen}>
                            View
                        </Button>
                    </Box>
                </CardActions>
            </Card>

            <NoticePreviewDialog 
            open={openDialog}
            onClose={onDialogClose}
            dialogData={data}/>

            <NoticeEditDialog
            open={openEditDialog}
            onClose={onEditDialogClose}
            dialogData={data}
            editFlag={editFlag}
            onEditSuccess={onEditSuccess}/>

            <NoticeDeleteDialog
            open={openDeleteDialog}
            onClose={onDeleteDialogClose}
            dialogData={data}
            deleteFlag={deleteFlag}
            onDelete={onDelete}/>
        </Box>
        
    )
}

export default NoticePreviewFragment