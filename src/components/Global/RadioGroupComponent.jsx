import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioGroupComponent({currentStatus,id}) {
    const [selected,setSelected] = React.useState(currentStatus)
    const onHandleChange = (e) => {
        console.log('radio status',e.target.value)
        setSelected(e.target.value)
    }
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selected}
        onChange={onHandleChange}
      >
        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
        <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
        <FormControlLabel value="Rejected" control={<Radio />} label="Rejected" />
      </RadioGroup>
    </FormControl>
  );
}