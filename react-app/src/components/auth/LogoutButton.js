import React from "react";
import { logout } from "../../services/auth";
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/actions/users'

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    await logout();
    // User must be relocated before removing the user from the state to prevent a race condition where the users slice of state is removed and cannot render the page accordingly.
    window.location.href = "/login"
    setAuthenticated(false);
    dispatch(removeUser())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
