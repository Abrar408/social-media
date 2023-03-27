import { Card, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { CurrUser } from '../App';

const UserDetail = ({rerender}) => {
  let currUser = useContext(CurrUser);
  async function getUpdatedBio(){
    await axios.post()
    return;
  }
  useEffect(() => {
    getUpdatedBio()
  },[rerender])
  return (
    <>
      <Card sx={{width:'300px', height:'450px',padding:'10px',backgroundColor:'#242526'}}>
        <Paper sx={{width:'300px',height:'300px',backgroundColor:'#E9F8F9'}}>
        </Paper>
        <Typography sx={{color:'white'}}>{`Username: ${currUser.user}`}</Typography>
        <Typography sx={{color:'white'}}>{`Email: ${currUser.email}`}</Typography>
        <Typography sx={{color:'white'}}>{`Gender: ${currUser.gender}`}</Typography>
        <Typography sx={{color:'white'}}>{`Joined: ${currUser.joined}`}</Typography>
        <Typography sx={{color:'white'}}>{`Followers:`}</Typography>
        <Typography sx={{color:'white'}}>{`Following: ${currUser.following.length}`}</Typography>
      </Card>
    </>
  )
}

export default UserDetail