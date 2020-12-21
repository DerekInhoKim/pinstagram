import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="nav_container">
      <div className="navbar_container">
        <div className="navbar_homepage_text">
          <NavLink className="navbar_text" to="/" exact={true} activeClassName="active_logo">
            Pinstagram
          </NavLink>
        </div>
        <div className="navbar_button_container">
          <div>
            <NavLink to ="/" exact={true} activeClassName="active"/>
          </div>
          <div>
              <IconButton component={NavLink} to="/post/create">
                <AddBoxIcon />
              </IconButton>
          </div>
          <div className="navbar_discover">
              <IconButton component={NavLink} to="/discover">
                <ExploreIcon/>
              </IconButton>
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
