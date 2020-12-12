import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/actions/users'
import { Button } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    buttonStyle: {
        fontWeight: "bold",
        color: "lightblue"
    }
})


const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const classes = useStyles()

  const onLogout = async (e) => {
    await logout();
    // User must be relocated before removing the user from the state to prevent a race condition where the users slice of state is removed and cannot render the page accordingly.
    window.location.href = "/login"
    setAuthenticated(false);
    dispatch(removeUser())
  };

  return <Button className={classes.buttonStyle} variant="outlined" onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
