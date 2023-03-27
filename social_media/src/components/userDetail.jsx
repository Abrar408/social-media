import { Card, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CurrUser } from '../App';

const UserDetail = ({rerender}) => {
  let currUser = useContext(CurrUser);
  const [fc,setFC] = useState(0)
  async function getUpdatedBio(){
    await axios.post('http://127.0.0.1:3000/getFollowing',{currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        setFC(res.data.length)
      }
    })
    .catch(err => console.error(err))
    
  }
  useEffect(() => {
    getUpdatedBio()
    return;
  },[rerender])
  return (
    <>
      <Card sx={{width:'300px', height:'450px',padding:'10px',backgroundColor:'#242526'}}>
        <Paper sx={{width:'300px',height:'300px',backgroundColor:'#3A3B3C'}}>
        </Paper>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Username:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${currUser.user}`}</Typography>
        </div>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Email:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${currUser.email}`}</Typography>
        </div>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Gender:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${currUser.gender}`}</Typography>
        </div>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Joined:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${currUser.joined}`}</Typography>
        </div>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Followers:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{``}</Typography>
        </div>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Following:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${fc}`}</Typography>
        </div>
        
      </Card>
    </>
  )
}

export default UserDetail