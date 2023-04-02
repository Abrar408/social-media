import { useState } from 'react';
import {Routes,Route,useNavigate} from 'react-router-dom';
import SignInSignOut from './containers/index';
import Profile from './containers/profile';

function App() {

  return (    
    <Routes>
      <Route path='/' element={<SignInSignOut/>} />
      <Route path='/dashboard/*' element={<Profile/>} />
    </Routes>    
  ) 
}

export default App
