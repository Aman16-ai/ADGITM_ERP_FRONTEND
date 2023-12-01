import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalOpen, selectModalType } from '../../store/slice/globalModal';
import { setOpen,updateAction } from '../../store/slice/globalModal';
import { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import "./style.css"
import { getMaintenanceCommentThunk, selectAllComments, selectCommentPayload } from '../../store/slice/MaintenanceSlice/commentSlice';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 580,
  height: 550,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius:"0.6rem"
};
const styleDialog = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  height: 150,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius:"0.6rem"
};
export default function GlobalModal() {
    const open = useSelector(selectModalOpen)
    const {maintenanceIssue} = useSelector(selectCommentPayload)
    const modelType = useSelector(selectModalType)
    const dispatch = useDispatch()
    const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setOpen(false));
    const comments = useSelector(selectAllComments)
    React.useEffect(() => {
      console.log("get maintenance comment useeffect :",maintenanceIssue)
      dispatch(getMaintenanceCommentThunk(maintenanceIssue))
    },[maintenanceIssue])

    React.useEffect(() => {
      console.log("new comments fetched")
    },[comments])
    // const [comments, setComments] = useState([
    //   {
    //     id: 1,
    //     username: 'John Doe',
    //     profilePicture: 'url-to-profile-picture',
    //     date: '2023-11-10',
    //     message: 'This is a sample comment.',
    //   },
    //   // Add more comments as needed
    // ]);
    
  const handlePostComment = (newComment) => {
    // const currentDate = new Date().toLocaleDateString();
    // const newCommentObject = {
    //   id: comments.length + 1,
    //   username: 'Current User', // You can replace this with the actual username
    //   profilePicture: 'url-to-current-user-profile-picture',
    //   date: currentDate,
    //   message: newComment,
    // };

    // setComments([...comments, newCommentObject]);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modelType === 'comment'?style:styleDialog}>
          {modelType === 'comment' ?<div className="max-w-lg h-full flex flex-col mx-auto">
            <CommentForm onPostComment={handlePostComment} />
            <h3 className="text-xl font-semibold mt-5">Comments</h3>
            <div className='overflow-y-scroll'>
            <CommentList comments={comments} />
            </div>
          </div>:
            <div className='max-w-lg h-full flex flex-col justify-center items-center'>
              <h1 className='text-3xl'>Are you sure?</h1>
              <div className='flex w-full  mt-5 justify-center items-center'>
                <Button className='w-[150px]' variant='contained' color='success' onClick={e => dispatch(updateAction(true))}>Yes</Button>
                <Button className='w-[150px]' style={{marginLeft:"7px"}} variant='contained' color='error'>No</Button>
              </div>
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
}
