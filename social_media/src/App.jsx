import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import SignInSignOut from './containers/index'
import Profile from './containers/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Profile/>
      {/* <SignInSignOut /> */}
    </div>
  ) 
}

export default App
