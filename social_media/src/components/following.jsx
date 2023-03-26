import { Button, Card, Paper, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CurrUser } from '../App'

const Following = ({rerender}) => { 
  const currUser = useContext(CurrUser)
  const [followingList,setFollowingList] = useState([])
  async function getFollowing(){
    await axios.post('http://127.0.0.1:3000/getFollowing',{currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        setFollowingList(res.data)
        console.log(followingList)
      }
    })
    .catch(err => console.error(err))
    return;
  }
  
  useEffect(()=>{
    getFollowing()
  },[rerender])
  return (
    <>
      <Card sx={{width:'300px',backgroundColor:'#fff',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Typography sx={{fontWeight:'bold',fontSize:'18px'}}>Following</Typography>
          {followingList.map((fol)=>{
            // console.log(fol)
            return(
              <Paper sx={{width:'300px',backgroundColor:'orange',display:'flex',alignItems:'center',padding:'5px'}}>
                <div style={{flex:'1'}}>
                  <Typography>{fol.user}</Typography>
                  <Typography>{fol.email}</Typography>
                </div>
                <div>
                  <Button variant='contained'>Un Follow</Button>
                </div>
              </Paper>
            )
          })}              
      </Card>
    </>
  )
}

export default Following