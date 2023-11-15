import React, { useEffect, useState } from 'react'
import FacultyCard from './FacutlyCard'
import { getAllFacutliesDetail, getAllUser } from '../../../services/User'
import UserCard from './UserCard'

export default function AllMaintenanceManager() {
      const [allUsersdata,setAllUsersData] = useState([])
      const fetchUserData = async() => {
        try {
            const result = await getAllUser("?role=MM")
            console.log('userdata dasta ------> ',result)
            const formatted_data = result.map((r) => {
                return {profilePicture:"",
                first_name:r.first_name,
                last_name:r.last_name,
                username:r.username,
                email:r.email,
                role:r.role}
            })
            console.log('formatted_data ---> ',formatted_data)
            setAllUsersData(formatted_data)
        }
        catch(err) {
            console.log(err)
        }
      }
      useEffect(() => {
        fetchUserData()
      },[])
      const onDelete = () => {

      }
      const onUpdate = () => {

      }
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
        {
            allUsersdata.map((data) => {
                return <UserCard key={data.username} data={data} onDelete={onDelete} onUpdate={onUpdate}/>
            })
        }
    </div>
  )
}
