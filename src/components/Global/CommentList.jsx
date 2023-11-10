// CommentList.js
import React from 'react';
import img from "../../static/profilePic.jpg"
const CommentList = (props) => {
  return (
    <div className="my-4 p-2">
      {Array.isArray(props.comments)?props.comments.map((comment) => (
        <div key={comment.id} className="relative flex items-center mb-4 border p-4 rounded-md">
          <img
            src={img}
            alt={`${comment.commented_by.username}'s profile`}
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-5">
            <p className="font-semibold">{comment.commented_by.username}</p>
            <p className="text-gray-600 text-sm">{comment.created_at}</p>
            <p>{comment.comment}</p>
          </div>
        </div>
      )):null}
    </div>
  );
};

export default CommentList;
