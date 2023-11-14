import React, { useEffect, useState } from 'react'
import FacultyCard from './FacutlyCard'
import { getAllFacutliesDetail } from '../../../services/User'

export default function AllFaculty() {
    const data = {
        profilePicture : "",
        first_name:"Aman",
        last_name:"Saxena",
        username:"Aman7531",
        email:"asaxena7531@gmail.com",
        faculty_id:"Aman7531AIML",
        department_id:"AIML",
        joined_at:"2023-05-23",
        role:"HOD",
      }
      const [allFacultyData,setAllFacultyData] = useState([])
      const fetchFacultyData = async() => {
        try {
            const result = await getAllFacutliesDetail()
            console.log('facutly dasta ------> ',result)
            const formatted_data = result.map((r) => {
                return {profilePicture:"",
                first_name:r.faculty_user.first_name,
                last_name:r.faculty_user.last_name,
                username:r.faculty_user.username,
                email:r.faculty_user.email,
                faculty_id:r.faculty_id,
                department_id:r.department.name,
                joined_at:r.joined_at,
                role:r.faculty_user.role}
            })
            console.log('formatted_data ---> ',formatted_data)
            setAllFacultyData(formatted_data)
        }
        catch(err) {
            console.log(err)
        }
      }
      useEffect(() => {
        fetchFacultyData()
      },[])
      const onDelete = () => {

      }
      const onUpdate = () => {

      }
  return (
    <div className='w-full grid grid-cols-3 gap-4'>
        {
            allFacultyData.map((data) => {
                return <FacultyCard key={data.username} data={data} onDelete={onDelete} onUpdate={onUpdate}/>
            })
        }
    </div>
  )
}
