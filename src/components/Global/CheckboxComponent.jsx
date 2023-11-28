import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { updateAlert } from "../../store/slice/alertSlice";
export default function CheckboxComponent({ status }) {
  const [checked, setChecked] = React.useState(true);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (status === "Verified") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [status]);
  const handleChange = (event) => {
    if (status === "Completed" || status === 'Verified') {
      setChecked(event.target.checked);
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
