import { Card, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrUser } from '../App';

const UserDetail = () => {
  let currUser = useContext(CurrUser);
  // console.log(currUser)
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