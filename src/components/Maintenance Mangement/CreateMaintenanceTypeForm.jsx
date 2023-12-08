import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { createDepartment } from "../../services/Department";
import { useDispatch } from "react-redux";
import { updateAlert } from "../../store/slice/alertSlice";
import { createMaintenanceType } from "../../services/Maintenance";

function CreateMaintenanceTypeForm() {
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const onHandleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const onSubmit = async () => {
    console.log("payload ----------> ", payload);
    try {
      if (
        payload.name === "" ||
        payload.name === null ||
        payload.name === " "
      ) {
        dispatch(
          updateAlert({
            open: true,
            message: "Please enter all fields",
            severity: "error",
          })
        );
      } else {
        setIsLoading(true);
        const result = await createMaintenanceType(payload);
        console.log(result);
        dispatch(
          updateAlert({
            open: true,
            message: "Successfully created",
            severity: "success",
          })
        );
      }
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
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-2xl">
      <h2 className="text-xl font-bold text-center mb-6">Create Maintenance Type</h2>

      <div className="mb-6">
        <label
          className="block text-gray-600 font-semibold text-sm mb-2"
          htmlFor="description"
        >
          Maintenane Type:
        </label>
        <input
          className="w-full p-3 border rounded-lg text-gray-700"
          id="description"
          name="name"
          rows="6"
          value={payload.name}
          type="text"
          onChange={onHandleChange}
        />
      </div>

      {/* <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-2" htmlFor="status">
            Status:
          </label>
          <select
            className="w-full p-3 border rounded-lg text-gray-700"
            id="status"
            name="status"
            value={payload.status}
            onChange={onHandleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div> */}

      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        {isLoading ? <CircularProgress sx={{ color: "white" }} /> : "Create"}
      </button>
    </div>
  );
}

export default CreateMaintenanceTypeForm;
