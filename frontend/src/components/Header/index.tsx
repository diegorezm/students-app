import React, {useContext, useState} from 'react';
import {ThemeContext} from '../../context/ThemeProvider';
import { useDispatch ,useSelector} from 'react-redux';
import * as actions from '../../store/modules/user/actions'
import {Link} from 'react-router-dom';
import {FaHome, FaSignInAlt, FaSun, FaRegMoon, FaUserAlt} from 'react-icons/fa';
import {Nav, BtnDiv, Dropdown} from './HeaderStyles';
import toast from 'react-hot-toast';
import {ToastStyleSuccess} from '../../styles/GlobalStyles';

export default function Header() {
  const {colorScheme, handleColorScheme} = useContext(ThemeContext)
  const [ showDropdown, setShowDropdown] = useState(false)
  const isAuth = useSelector(state => state.user.isAuth)
  const pfp = useSelector(state => state.user.user.profile_pic)
  console.log(pfp)
  const {name} = colorScheme
  const dispatch = useDispatch() 


  const showHideDropdown = () => {
    return setShowDropdown(!showDropdown)
  }
  const logout = ( ) => {
     dispatch(actions.loginError())
     setShowDropdown(false)
     toast.success("Logout succesfull!" , ToastStyleSuccess(colorScheme))
    
  }
  const ComponentDropDown = () => { return (
      <Dropdown colors={colorScheme}>
        <ul>
          <li onClick={showHideDropdown}>
            <Link to="/profile" className='links'>
              Profile
            </Link>
          </li>
          <li onClick={showHideDropdown}>
            <Link to="/students" className='links'>
              Students
            </Link>
          </li>
          <li onClick={showHideDropdown}>
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </Dropdown>
    )
  }
  return (
    <Nav colors={colorScheme}>
      {showDropdown ? <ComponentDropDown/> : null}
      <BtnDiv colors={colorScheme}>
        <Link className='links' to="/">
          <FaHome />
        </Link>
      </BtnDiv>
      <BtnDiv colors={colorScheme}>
        <span onClick={handleColorScheme}>
          {name === 'gruvbox_dark' ? <FaRegMoon /> : <FaSun />}
        </span>

        {
          isAuth ? (
            <span onClick={showHideDropdown}>
              { pfp !== 'none' ? <img src={pfp} alt='pfp'/> : <FaUserAlt />  }
            </span>
          ) : (
            <Link to="/login" className='links'>
              <FaSignInAlt />
            </Link>

          )
        }
      </BtnDiv>
    </Nav>
  );
}

