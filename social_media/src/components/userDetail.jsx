import { Card, Paper, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CurrUser } from '../App';

const UserDetail = () => {
  let currUser = useContext(CurrUser);
  console.log(currUser)
  return (
    <>
      <Card sx={{width:'300px', height:'450px',padding:'10px',backgroundColor:'blue'}}>
        <Paper sx={{width:'300px',height:'300px',backgroundColor:'green'}}>
        </Paper>
        <Typography>{currUser.user}</Typography>
        <Typography>{currUser.email}</Typography>
        <Typography>{currUser.gender}</Typography>
        <Typography>active since</Typography>
        <Typography>followers</Typography>
        <Typography>following</Typography>
      </Card>
    </>
  )
}

export default UserDetail