import { Button, Card, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { CurrUser } from '../App';
import axios from 'axios'

const Followers = () => {
  
  const currUser = useContext(CurrUser)
  const [followerList,setFollowerList] = useState([])

  // async function getFollowers(){
  //   await axios.post('http://127.0.0.1:3000/getFollowers',{currUser:currUser._id})
  //   .then(res => {
  //     if(res.status == 200){
  //     }
  //   })
  //   .catch(err => console.error(err))
  //   return;
  // }
  // useEffect(async () => {
  //     // getFollowers()

  // },[])
  return (
    <>
      <Card sx={{height:'450px',backgroundColor:'#242526',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography sx={{fontWeight:'bold',fontSize:'18px',color:'white',mb:'10px'}}>Followers</Typography>
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