import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';
import './Header.css'


const Header = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return(
        <div className='container-header'>
            
            
            <Link to='/' className='hacker-link'>
                    Dashboard
                </Link>
                <div className='nav-items'>
                <Link to='/' className='new-link'>
                    New
                </Link>
                <div className='striaght'>
                    |
                </div>
                <Link to="/top" className="new-link">
                  top
                </Link>
                <div className='striaght'>
                    |
                </div>
                <Link to='/search' className='submit-link'>
                Search
            </Link>
                <div className='striaght'>
                    |
                </div>
                {authToken && (
                <Link to='/create' className='submit-link'>
                    Submit
                </Link>
              
            
)}
                
                </div>
                <div className="">
        {authToken ? (
          <div
            className="submit-link"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            Logout
          </div>
        ) : (
          <Link
            to="/login"
            className="submit-link"
          >
            Login
          </Link>
        )}
      </div>
</div>

        
    )
}
export default Header