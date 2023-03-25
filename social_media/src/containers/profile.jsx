import PrimarySearchAppBar from '../components/navbar'
import React from 'react'
import Followers from '../components/followers'
import Following from '../components/following'
import UserDetail from '../components/userDetail'

const Profile = () => {
  return (
    <>
    <PrimarySearchAppBar/>
    <div style={{display:'flex'}}>
        <div>
            <UserDetail/>
        </div>
        <div>
            <Followers/>
        </div>
        <div>
            <Following/>
        </div>
    </div>
    </>
  )
}

export default Profile