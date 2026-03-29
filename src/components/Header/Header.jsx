import {Container, Logo, LogoutBtn} from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {

  //useSelector == React-Redux hook --> read (select) data from the Redux store state inside a React component.
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const navItems = [        //if active = true --> Display it 
    {
      name: 'Home',
      slug: "/",                //Route path 
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",            //Route path 
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",           //Route path 
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",        //Route path 
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",         //Route path 
      active: authStatus,
  },
  ]

  return (
     <header className='py-3 shadow bg-gray-500'>

      <Container>

        <nav className='flex'>

          <div className='mr-4'>
              <Link to='/'>
                       <Logo width = '70px'/>
              </Link>
          </div>

          <ul className='flex ml-auto'>

            {navItems.map((item) =>(
              item.active?(

                <li key = {item.name}>
                          <button onClick={() => navigate(item.slug)}
                  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    
                          {item.name} </button>
                </li>
              ):null
            ))}

            {authStatus && (          // if authStatus = true then (...)
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
      
     </header>
  )
}
