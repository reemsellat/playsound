import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from './playsound_prev_ui.png'

import DropDown from './dropDown';
const Navbar = () => {
 
  const { user } = useAuthContext()
 
  return (
    <header>
      <div className="container">
        <Link className='flex items-center' to="/">
          <img className='h-12' src={logo}></img>
          <h1 className='font-semibold'>PlaySound</h1>
        </Link>
        <nav>
          {user && (
            <div>
              
              <DropDown></DropDown>
          
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar