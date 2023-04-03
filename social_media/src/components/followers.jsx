import { Button, Card, Paper, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Followers = ({rerender,setRerender}) => { 
  const currUser = useSelector((state) => state.user.currUser);
  const accessToken = useSelector((state) => state.user.accessToken);
  const [followerList,setFollowerList] = useState([]);
  
  const remFollowing = async (user) => {
    await axios.post('http://127.0.0.1:3000/following/remove',{userid: user.fol._id,currUser:currUser.email},{
      headers: {
        'authorization': `Bearer ${accessToken}`,
      }
    })
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
    const getFollowers = async () => {
      await axios.post('http://127.0.0.1:3000/followers/get',{currUser:currUser.email},{
        headers: {
          'authorization': `Bearer ${accessToken}`,
        }
      })
      .then(res => {
        if(res.status == 200){
          console.log(res.data)
          setFollowerList(res.data);
        }
      })
      .catch(err => console.error(err))
    }
    getFollowers();
    return;
  },[rerender])

  const addFollowing = async (user) => {
    await axios.post('http://127.0.0.1:3000/following/add',{userid: user.user,currUser:currUser.email},{
      headers: {
        'authorization': `Bearer ${accessToken}`,
      }
    })
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
        <Typography sx={{fontWeight:'bold',fontSize:'18px',color:'white',mb:'10px'}}>Followers</Typography>        
          {followerList.map((fol)=>{
            return(
              <Paper sx={{width:'300px',backgroundColor:'#3A3B3C',display:'flex',alignItems:'center',padding:'5px', mb:'2px',borderBottom:'1px solid pink'}}>
                <div style={{flex:'1'}}>
                  <Typography sx={{fontWeight:'bold',color:'white'}}>{fol.doc.username}</Typography>
                  <Typography sx={{fontSize:'15px',color:'gray'}}>{fol.doc.email}</Typography>
                </div>
                <div>
                {fol.b ? <Button variant='outlined' sx={{textTransform:'none'}}>following</Button> :<Button variant='contained' sx={{backgroundColor:'#537FE7',textTransform:'none'}} startIcon={<AddCircleRoundedIcon/>} onClick={()=>{addFollowing({user:fol.doc._id.toString()})}}>Follow</Button> }
                </div>
              </Paper>
            )
          })}              
      </Card>
    </>
  )
}

export default Followers