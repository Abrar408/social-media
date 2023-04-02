import { Card, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CurrUser } from '../App';
import avatar from '../assets/avatar.jpg'

const UserDetail = ({rerender}) => {
  let currUser = useContext(CurrUser);
  const [fc,setFC] = useState(0)

  
  useEffect(() => {
    
    const getUpdatedBio = async () => {
      await axios.post('http://127.0.0.1:3000/following/get',{currUser:currUser.email})
      .then(res => {
        if(res.status == 200){
          setFC(res.data.length)
        }
      })
      .catch(err => console.error(err))
    }
    getUpdatedBio()
    return;
  },[rerender])
  return (
    <>
      <Card sx={{width:'300px',padding:'10px',backgroundColor:'#242526'}}>
        <Paper sx={{width:'300px',height:'300px',backgroundColor:'#03DAC6',mb:'10px'}}>
        <img src={avatar} alt="avatar" width='300px' height='300px' />
        </Paper>
        <div style={{display:'flex'}}>
          <Typography sx={{flex:'1', color:'gray'}}>{`Username:`}</Typography>
          <Typography sx={{flex:'2',color:'white'}}>{`${currUser.username}`}</Typography>
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