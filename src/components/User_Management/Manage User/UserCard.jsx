// CardComponent.js
// HorizontalCardComponent.js
import React from 'react';
import img from "../../../static/profilePic.jpg"

const UserCard = ({ data, onUpdate, onDelete }) => {
  const {
    profilePicture,
    first_name,
    last_name,
    username,
    email,
    role,
  } = data;

  return (
    <div className="max-w-xl bg-white border rounded-lg overflow-hidden shadow-lg mx-2 my-4 flex">
      <img
        className="w-1/3 h-auto object-cover"
        src={img}
        alt={`${first_name} ${last_name}`}
      />
      <div className="w-2/3 p-4">
        <div className="font-bold text-xl mb-2">
          {first_name} {last_name}
        </div>
        <p className="text-gray-700 text-base mb-2">Username: {username}</p>
        <p className="text-gray-700 text-base mb-2">Email: {email}</p>
        <p className="text-gray-700 text-base mb-2">Role: {role}</p>
        <div className="mt-4 flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => onUpdate(data)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onDelete(data)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
