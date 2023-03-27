import { Button, Card, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { CurrUser } from '../App';
import axios from 'axios'

const Followers = () => {
  let currUser = useContext(CurrUser);
  useEffect(async () => {
    // let followers = await axios.post('http://localhost:3000/loginUser',cred)

  },[])
  return (
    <>
      <Card sx={{height:'450px',backgroundColor:'#242526',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography sx={{fontWeight:'bold',fontSize:'18px',color:'white'}}>Followers</Typography>
        <Paper sx={{width:'300px',backgroundColor:'#3A3B3C',display:'flex',alignItems:'center',padding:'5px'}}>
          <div style={{flex:'1'}}>
            <Typography sx={{fontWeight:'bold',color:'white'}}>Username</Typography>
            <Typography sx={{fontSize:'15px',color:'gray'}}>Email</Typography>
          </div>
          <div>
            <Button variant='contained' sx={{backgroundColor:'#537FE7'}}>Follow</Button>
          </div>
        </Paper>
      </Card>
    </>
  )
}

export default Followers