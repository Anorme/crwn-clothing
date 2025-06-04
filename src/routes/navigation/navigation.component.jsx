import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { UserContext } from "../../contexts/user.context";

import CrownLogo from '../../assets/crown.svg?react';
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);
  
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrownLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navigation;