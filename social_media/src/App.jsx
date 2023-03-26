import { createContext, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import SignInSignOut from './containers/index'
import Profile from './containers/profile'
let CurrUser = createContext();

function App() {
  const [auth, setAuth] = useState(true)
  const [currUser, setCurrUser] = useState('')

  return (
    <>
      <CurrUser.Provider value={currUser}>
      {auth ? <Profile/> : <SignInSignOut setAuth={setAuth} setCurrUser={setCurrUser} />}
      </CurrUser.Provider>
    </>
  ) 
}

export default App
export {CurrUser}
