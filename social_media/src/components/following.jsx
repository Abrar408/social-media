import { Button, Card, Paper, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Following = ({rerender,setRerender}) => { 
  const currUser = useSelector((state) => state.user.currUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [followingList,setFollowingList] = useState([]);
  
  const remFollowing = async (user) => {
    await axios.post('http://127.0.0.1:3000/following/remove',{userid: user.fol._id,currUser:currUser.email})
    .then(res => {
      if(res.status == 200){
        if(rerender){
          setRerender(false);
        }else{
          setRerender(true);
        }
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    const getFollowing = async () => {
      await axios.post('http://127.0.0.1:3000/following/get',{currUser:currUser.email},{
        headers: {
          'authorization': `Bearer ${accessToken}`,
        }
      })
      .then(res => {
        if(res.status == 200){
          setFollowingList(res.data);
        }
      })
      .catch(err => console.error(err))
    }
    getFollowing();
    return;
  },[rerender])
  
  return (
    <>
      <Card sx={{height:'450px', minWidth:'320px',backgroundColor:'#242526',padding:'10px',display:'flex',flexDirection:'column',alignItems:'center',overflow:'auto',scrollbarWidth: 'thin',
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
          {followingList.map((fol)=>{
            return(
              <Paper sx={{width:'300px',backgroundColor:'#3A3B3C',display:'flex',alignItems:'center',padding:'5px', mb:'2px',borderBottom:'1px solid #03DAC6 '}}>
                <div style={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold',color:'white'}}>{fol.username}</Typography>
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