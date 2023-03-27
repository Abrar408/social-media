import { Button, Card, Paper, Typography } from '@mui/material'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CurrUser } from '../App'

const Following = ({rerender,setRerender}) => { 
  const currUser = useContext(CurrUser)
  const [followingList,setFollowingList] = useState([])

  async function getFollowing(){
    console.log("1")
    console.log(followingList)
    console.log("3")
    await axios.post('http://127.0.0.1:3000/getFollowing',{currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        setFollowingList(res.data)
        console.log("2")
        console.log(followingList)
        console.log("4")
      }
    })
    .catch(err => console.error(err))
    return;
  }
  const remFollowing = async (user) => {
    console.log(user.fol._id)
    await axios.post('http://127.0.0.1:3000/remFollowing',{userid: user.fol._id,currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        console.log(res.data)
        if(rerender){
          setRerender(false)
        }else{
          setRerender(true)
        }
      }
    })
    .catch(err => console.log(err))
  }
  useEffect(()=>{
    getFollowing();
    return;
  },[rerender])
  
  return (
    <>
      <Card sx={{height:'450px',backgroundColor:'#242526',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center',overflow:'auto',scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '0.6em',
  },
  '&::-webkit-scrollbar-track': {
    background: "#f1f1f1",
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555'
  }}}>
        <Typography sx={{fontWeight:'bold',fontSize:'18px',color:'white',mb:'10px'}}>Following</Typography>
        {/* <Paper sx={{width:'300px',backgroundColor:'#F3EFE0',display:'flex',alignItems:'center',padding:'5px'}}>
                <div style={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold'}}>Username</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>Email</Typography>
                </div>
                <div>
                  <Button variant='contained' sx={{backgroundColor:'#537FE7'}}>Un Follow</Button>
                </div>
              </Paper> */}
          {followingList.map((fol)=>{
            // console.log(fol)
            return(
              <Paper sx={{width:'300px',backgroundColor:'#3A3B3C',display:'flex',alignItems:'center',padding:'5px', mb:'2px',borderBottom:'1px solid #03DAC6 '}}>
                <div style={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold',color:'white'}}>{fol.user}</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>{fol.email}</Typography>
                </div>
                <div>
                  <Button variant='contained' startIcon={<RemoveCircleRoundedIcon/>} sx={{backgroundColor:'#537FE7',textTransform:'none'}} onClick={()=>{remFollowing({fol})}}>Unfollow</Button>
                </div>
              </Paper>
            )
          })}              
      </Card>
    </>
  )
}

export default Following