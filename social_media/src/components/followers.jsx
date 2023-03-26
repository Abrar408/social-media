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
      <Card sx={{backgroundColor:'#fff',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography sx={{fontWeight:'bold',fontSize:'18px'}}>Followers</Typography>
        <Paper sx={{width:'300px',backgroundColor:'pink',display:'flex',alignItems:'center',padding:'5px'}}>
          <div style={{flex:'1'}}>
            <Typography>Username</Typography>
            <Typography>Email</Typography>
          </div>
          <div>
            <Button variant='contained'>Follow</Button>
          </div>
        </Paper>
      </Card>
    </>
  )
}

export default Followers