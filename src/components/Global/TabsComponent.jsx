import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function TabsComponent({tabsData,handleChange,value,setValue}) {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange}>
        {tabsData.map((d) => {
            return <Tab key={d.value} value={d.value} label={d.label} />
        })}
      </Tabs>
    </Box>
  );
}
