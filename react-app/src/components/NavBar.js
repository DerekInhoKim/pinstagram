import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="nav_container">
      <div className="navbar_container">
        <div className="navbar_homepage_text">
          <NavLink to="/" exact={true} activeClassName="active">
            Pinstagram
          </NavLink>
        </div>
        <div className="navbar_button_container">
          <div className="navbar_discover">
            <NavLink to="/discover" exact={true} activeClassName="active">
              <IconButton>
                <ExploreIcon/>
              </IconButton>
            </NavLink>
          </div>
          <div className="logout_button">
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
