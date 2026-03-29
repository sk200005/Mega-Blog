import './App.css'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.js'
import { login, logout } from './store/authSlice.js';
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom';


function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Syncing FrontEnd and Backend on User Login condition 
  //A bridge between persistent backend session and temporary frontend memory.

  useEffect(()=>{
    authService.getCurrentUser()                  // check for backend session
    .then((userData) => {                         // takeout userData from backend
      if(userData) { dispatch (login(userData))}  // if (session) -> update to fontend 
                                  // userData transfere from .getCurrentUser() → login()
      else dispatch(logout())     // else logout user
    })
    .finally(() => setLoading(false))     // turn-Off loading 
  }, [dispatch])



  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
      <div className='w-full block'>

        <Header />
        <main>
          <Outlet />
        </main>
        <Footer/>

      </div>
    </div>
  ) : null;
}
export default App
