import { useEffect, useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Home from './Home'
import { auth } from './firebase'
import Dashboard from './components/Dashboard/Dashboard'

function App() {
  const [username , setUsename] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUsename(user.displayName)
        console.log(user.displayName)
      } else setUsename("")
    })
  })
 

  return (
    <>
       <Router>
         <Routes>
             <Route path='/login' element ={<Login/>} />
             <Route path='/signup' element = {<Signup/>}/>  
             <Route path='/' element = {<Home />}/> 
             <Route path='/dashboard' element = {<Dashboard name={username}/>}/> 


         </Routes>
       </Router>

    </>
  )
}

export default App
