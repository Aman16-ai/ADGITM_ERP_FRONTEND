// src/components/RegistrationForm.js
import React, { useEffect, useState } from "react";
import { updateAlert } from "../../store/slice/alertSlice";
import { useDispatch } from "react-redux";
import { registerFaculty } from "../../services/User";
import CircularProgressBarButton from "../Global/CircularProgressBarButton";
import { getAllDeparments } from "../../services/Department";

const UserForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    role: "HOD",
    facultyId: "",
    department: 1,
    joinedAt: "",
    salary: 2000,
    lastPromotionOn: "2023-03-09",
    experience: 4,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [department,setDeparments] = useState([])
  const getDeparments = async() => {
    try {
      const departmentList = await getAllDeparments()
      setDeparments(departmentList)
      console.log('deparmtent service',departmentList[0].id)
      setFormData({...formData,department:departmentList[0].id})
    }
    catch(err) {
      alert(err)
    }
  }
  useEffect(()=> {
    getDeparments()
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    const payload = {
      faculty_user: {
        password: formData.password,
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        is_active: true,
        is_staff: false,
        is_superuser: false,
        username: formData.username,
        password_changed: false,
        role: formData.role,
      },
      faculty_id: formData.username,
      department: 1,
      joined_at: "2023-03-09",
      salary: 20000,
      last_promotion_on: "2023-03-09",
      experience: 3,
    };
    try {
      setIsLoading(true);
      console.log("register faculty payload");
      const result = await registerFaculty(payload);
      console.log("regitartion resposne", result);
      dispatch(
        updateAlert({
          open: true,
          message: "Successfully created",
          severity: "success",
        })
      );
    } catch (err) {
      dispatch(
        updateAlert({ open: true, message: err.toString(), severity: "error" })
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        dispatch(updateAlert({ open: false }));
      }, 2000);
    }
  };

  return (
    <div className="w-[55%] mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Register User
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            First Name:
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="form-input h-12 p-2 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Last Name:
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="fform-input h-12 p-2 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Username:
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Role:
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 p-2 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="HOD">HOD</option>
            <option value="Professor">Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            {/* Add other role options if needed */}
          </select>
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="facultyId"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Faculty ID:
          <input
            type="text"
            id="facultyId"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 block p-2 w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div className="mb-4">
        <label
          htmlFor="department"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Department:
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 block p-2 w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          >
            {
              department.map((d)=> {
                return <option value={d.id}>{d.name}</option>
              })
            }
            {/* Add other department options if needed */}
          </select>
        </label>
      </div>

      {/* <div className="mb-4">
        <label htmlFor="joinedAt" className="block text-sm font-medium text-gray-600 mb-1">
          Joined At:
          <input
            type="text" // Consider using a date picker or other suitable input type for dates
            id="joinedAt"
            name="joinedAt"
            value={formData.joinedAt}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="salary" className="block text-sm font-medium text-gray-600 mb-1">
          Salary:
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="form-input h-12 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
          />
        </label>
      </div> */}

      {/* <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="lastPromotionOn" className="block text-sm font-medium text-gray-600 mb-1">
            Last Promotion On:
            <input
              type="text" // Consider using a date picker or other suitable input type for dates
              id="lastPromotionOn"
              name="lastPromotionOn"
              value={formData.lastPromotionOn}
              onChange={handleInputChange}
              className="form-input h-12 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-600 mb-1">
            Experience (years):
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="form-input h-12 mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
      </div> */}

      {/* <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Register
      </button> */}
      <CircularProgressBarButton width={"full"} text={'Register'} isLoading={isLoading} onClick={handleSubmit}/>
    </div>
  );
};

export default UserForm;
