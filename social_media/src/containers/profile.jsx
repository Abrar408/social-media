import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from '../components/navbar';
import Followers from '../components/followers';
import Following from '../components/following';
import UserDetail from '../components/userDetail';
import { useNavigate } from 'react-router-dom';
import { setCurrUser, setLoggedInUser, setAccessToken} from '../features/UserSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rerender,setRerender] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      await axios.get('http://localhost:3000/refresh',{
        withCredentials: true,
        credentials:true,
      })
      .then(res => {
        dispatch(setCurrUser(res.data.result))
        dispatch(setAccessToken(res.data.accessToken));
        setLoggedIn(true)
        if(rerender){
          setRerender(false);
        }else{
          setRerender(true);
        }
        // console.log(res.data.accessToken);
      })
      .catch(err => {
        console.error(err);
        navigate('/');
      })
    }
    verifyToken();
  },[])
  
  console.log('rerendering');
  return (
    <>{loggedIn ? <div style={{backgroundColor:'#18191A',height:'100vh',margin:'0px'}}>
    <PrimarySearchAppBar rerender={rerender} setRerender={setRerender}/>
    <div style={{display:'flex',margin:'10px 0px',padding:'10px'}}>
        <div style={{display:'flex',flex:'2',justifyContent:'center'}}>
            <UserDetail rerender={rerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Followers rerender={rerender} setRerender={setRerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Following rerender={rerender} setRerender={setRerender}/>
        </div>
    </div>
    </div> : 
    <div style={{backgroundColor:'#18191A',height:'100vh',width:'100vw',display:'flex'}}>
      <div style={{margin:'auto',color:'white', fontSize:'50px'}}>Loading...</div>
    </div>}
    
    </>
  )
}

export default Profile