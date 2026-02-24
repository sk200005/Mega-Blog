import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js';
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Syncing FrontEnd and Backend on User Login condition 
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) { dispatch (login(userData))}  // Check backend session
                                                    // If session exists → dispatch(login)
      else dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])

  //A bridge between persistent backend session and temporary frontend memory.




  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
      <div className='w-full block'>

        <Header />
        <main>
        TODO:  {/* <Outlet/> */}
        </main>
        <Footer/>

      </div>
    </div>
  ) : null;
}
export default App
