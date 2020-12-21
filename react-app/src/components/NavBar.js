import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    icon: {
      '&.active': {
        color: "black"
      },
      color: "gray"
    }
  }
)

const NavBar = ({ setAuthenticated }) => {
  const classes = useStyles()

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
            {/* <NavLink to ="/" exact={true} activeClassName="active"/> */}
            <IconButton className={classes.icon} component={NavLink} to ="/" activeClassName="active" exact={true}>
              <HomeIcon />
            </IconButton>
          </div>
          <div>
              <IconButton className={classes.icon} component={NavLink} to="/post/create" activeClassName="active" exact={true}>
                <AddBoxIcon />
              </IconButton>
          </div>
          <div className="navbar_discover">
              <IconButton className={classes.icon} component={NavLink} to="/discover" activeClassName="active" exact={true}>
                <ExploreIcon />
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
