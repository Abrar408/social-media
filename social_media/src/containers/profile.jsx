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
    <div style={{backgroundColor:'#cccccc'}}>
    <PrimarySearchAppBar rerender={rerender} setRerender={setRerender}/>
    <div style={{display:'flex',height:'100%',margin:'10px 0px',padding:'10px'}}>
        <div style={{display:'flex',flex:'2',justifyContent:'center',alignItems:'center'}}>
            <UserDetail rerender={rerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Followers rerender={rerender}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Following rerender={rerender}/>
        </div>
    </div>
    </div>
    </>
  )
}

export default Profile