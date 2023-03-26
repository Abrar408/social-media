import PrimarySearchAppBar from '../components/navbar'
import React from 'react'
import Followers from '../components/followers'
import Following from '../components/following'
import UserDetail from '../components/userDetail'

const Profile = () => {
  return (
    <>
    <PrimarySearchAppBar/>
    <div style={{display:'flex',height:'80vh',backgroundColor:'lightgray',margin:'10px 0px',padding:'10px'}}>
        <div style={{display:'flex',flex:'2',justifyContent:'center',alignItems:'center'}}>
            <UserDetail/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Followers/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'center'}}>
            <Following/>
        </div>
    </div>
    </>
  )
}

export default Profile