import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/login'
import Register from '../components/register';
import { Grid, Paper } from '@mui/material';
import LoginImage from '../assets/login.jpg'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div style={{width:'95vw',height:'95vh',display:'flex'}}>
      <div style={{margin:'0px',flex:'1'}}>
        <img src={LoginImage} alt="Login Image" width='62%' />
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Paper elevation={10} sx={{width:'300px', margin:'auto',display:'inline-block'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Login" {...a11yProps(0)} sx={{margin:'0px auto'}}/>
              <Tab label="Register" {...a11yProps(1)} sx={{margin:'0px auto'}}/>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Login setAuth={props.setAuth} setCurrUser={props.setCurrUser}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>        
        </Paper> 
      </div>
    </div>
    
      
         
    </>
  );
}