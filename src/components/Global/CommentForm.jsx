// CommentForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommentPayload, selectIsLoading, setPayload } from '../../store/slice/MaintenanceSlice/commentSlice';
import { postMaintenanceCommentThunk } from '../../store/slice/MaintenanceSlice/commentSlice';
import CircularProgressBarButton from './CircularProgressBarButton';
const CommentForm = ({ onPostComment }) => {
  const dispatch = useDispatch()
  const payload = useSelector(selectCommentPayload)
  const isLoading = useSelector(selectIsLoading)
  const handlePostComment = () => {
    console.log("comment payload ",payload)
    dispatch(postMaintenanceCommentThunk(payload))
  };

  return (
    <div className="mt-4 relative">
    <h3 className="text-xl mt-4 font-semibold mb-4">Post a Comment</h3>
    <textarea
      className="w-full p-2 border rounded-md mb-2"
      placeholder="Write your comment..."
      value={payload.comment}
      onChange={(e) => dispatch(setPayload({name:"comment",value:e.target.value}))}
    />
    
    <CircularProgressBarButton width={'20px'} isLoading={isLoading} onClick={handlePostComment} text={"Post comment"}/>
  </div>
  );
};

export default CommentForm;
