// import * as React from 'react';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// export default function ToggleButtonChats() {
//   const [alignment, setAlignment] = React.useState('web');

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <ToggleButtonGroup
//       color="primary"
//       value={alignment}
//       exclusive
//       onChange={handleChange}
//       aria-label="Platform"
//       sx={{ width: '100%', display:'flex', justifyContent:'space-around' }}
//     >
//       <ToggleButton value="All" sx={{ minWidth: '100px', height:'35px', border:'none', borderBottom:'3px solid blue' }} >All</ToggleButton>
//       <ToggleButton value="Regulars" sx={{ minWidth: '100px', height:'35px', border:'none' }} >Regulars</ToggleButton>
//       <ToggleButton value="Unread" sx={{ minWidth: '100px', height:'35px', border:'none' }} >Unread</ToggleButton>
//     </ToggleButtonGroup>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import text from '../../node_modules/dom-helpers/esm/text';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ToggleButtonChats({dark}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',textColor: `${dark ? '#229ED9':'#fff' }` }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant='scrollable' TabIndicatorProps={{style: {background:`${dark ? '#229ED9':'#fff' }`,height:'4px',borderRadius:'20px' }}} >
          <Tab label="All" {...a11yProps(0)} sx={{ color:'#ffffff' }} />
          <Tab label="Regular" {...a11yProps(1)} sx={{ color:'#ffffff' }} />
          <Tab label="Unread" {...a11yProps(2)} sx={{ color:'#ffffff' }} />
          <Tab label="Personal" {...a11yProps(2)}sx={{ color:'#ffffff' }} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
}
