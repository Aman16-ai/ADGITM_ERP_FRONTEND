import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store/slice/alertSlice";
import { updateIssueStatus, updateMaintenaceIssueThunk } from "../../store/slice/MaintenanceSlice/maintenanceSlice";
import { selectModalAction, setOpen, updateAction, updateType } from "../../store/slice/globalModal";
export default function CheckboxComponent({ id,status }) {
  const [checked, setChecked] = React.useState(true);
  const [checkEvent,setCheckEvent] = React.useState(false)
  const dialogAction = useSelector(selectModalAction)
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (status === "Verified") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [status]);
  React.useEffect(() => {
    console.log("Check event",checkEvent)
    console.log('dialog action',dialogAction)
    if(checkEvent === true && dialogAction === true) {
      const body = {status:"Verified"}
      dispatch(updateMaintenaceIssueThunk({originalIssueId:id,originalStatus:status,body:body}))
      setChecked(true);
      dispatch(updateIssueStatus({id:id,newStatus:"Verified"}))
      dispatch(updateAction(false))
      setCheckEvent(false)
      dispatch(setOpen(false))
    }
  },[dialogAction,checkEvent])
  const handleChange = (event) => {
    if(status === 'Verified') {
      dispatch(
        updateAlert({
          open: true,
          message: "Verified issues cannot unverified",
          severity: "error",
        })
      );
  setTimeout(()=> {
    dispatch(
        updateAlert({
          open: false,
        })
      );
  },[2000])
    }
    else if (status === "Completed") {
      // const body = {status:"Verified"}
      // dispatch(updateMaintenaceIssueThunk({originalIssueId:id,originalStatus:status,body:body}))
      // setChecked(event.target.checked);
      // dispatch(updateIssueStatus({id:id,newStatus:"Verified"}))
      setCheckEvent(true)
      dispatch(setOpen(true))
      dispatch(updateType("dialog"))

    } else {
        dispatch(
            updateAlert({
              open: true,
              message: "Only completed issues can verified",
              severity: "error",
            })
          );
      setTimeout(()=> {
        dispatch(
            updateAlert({
              open: false,
            })
          );
      },[2000])
    }
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
