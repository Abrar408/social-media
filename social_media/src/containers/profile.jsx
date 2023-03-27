import PrimarySearchAppBar from '../components/navbar'
import React, { useState } from 'react'
import Followers from '../components/followers'
import Following from '../components/following'
import UserDetail from '../components/userDetail'

const Profile = () => {
  const [rerender,setRerender] = useState(true)
  console.log('rerendering')
  return (
    <>
    <div style={{backgroundColor:'#18191A',height:'100vh',margin:'0px'}}>
    <PrimarySearchAppBar rerender={rerender} setRerender={setRerender}/>
    <div style={{display:'flex',margin:'10px 0px',padding:'10px'}}>
        <div style={{display:'flex',flex:'2',justifyContent:'center'}}>
            <UserDetail rerender={rerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Followers rerender={rerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Following rerender={rerender} setRerender={setRerender}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Profile