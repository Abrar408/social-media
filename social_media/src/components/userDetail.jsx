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
      <Card sx={{width:'300px', height:'450px',padding:'10px',backgroundColor:'#fff'}}>
        <Paper sx={{width:'300px',height:'300px',backgroundColor:'#4ced5f'}}>
        </Paper>
        <Typography >{`Username: ${currUser.user}`}</Typography>
        <Typography >{`Email: ${currUser.email}`}</Typography>
        <Typography >{`Gender: ${currUser.gender}`}</Typography>
        <Typography >{`Joined: ${currUser.joined}`}</Typography>
        <Typography >{`Followers:`}</Typography>
        <Typography >{`Following: ${currUser.following.length}`}</Typography>
      </Card>
    </>
  )
}

export default UserDetail