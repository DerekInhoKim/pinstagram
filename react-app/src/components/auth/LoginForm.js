import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import {setUser} from '../../redux/actions/users';
import {Button, TextField} from '@material-ui/core';
import loginPageImage from '../../images/loginpageimage.png'
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  buttonStyle: {
    fontWeight: "bold",
    color: "white",
    marginTop: "15px",
    width: "4rem",
    // border: ".5px solid gray"
  },
  border: {
    // borderWidth: "thin",
    // borderColor: "black",
    border: "1px solid lightgray",
    borderRadius: "2px",
    width: "20rem",
    height: "25rem",
    position: "relative",
    top: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  signUp: {
    marginTop: "3px",
    border: "1px solid lightgray",
    borderRadius: "2px",
    width: "20rem",
    height: "5rem",
    position: "relative",
    top: "5rem",
    display: "flex",
    flexDirection: "",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    fontWeight: "200",
    // flexDirection: "column",
    backgroundColor: "white",
  }
})

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const currentUser = useSelector(state => state.users.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()

  const classes = useStyles()

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!currentUser){
      dispatch(setUser(user))
    }
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = () => {
    history.push("/sign-up")
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login_page_container">
      <div className="login_page_image">
        <img src={loginPageImage} width="40%" alt="login page image"/>
      </div>
      <div className="login_form_container">
        <Container >
          <form className={classes.border} onSubmit={onLogin}>
            <p className="login_form_header">Pinstagram</p>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Email"
                name="email"
                variant="filled"
                type="text"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <TextField
                label="Password"
                id="standard-basic"
                name="password"
                variant="filled"
                type="password"
                value={password}
                onChange={updatePassword}
              />
              {/* <button type="submit">Login</button> */}
            </div>
            <Button className={classes.buttonStyle} color="primary" variant="contained" type="submit">Login</Button>
          </form>
          <div className={classes.signUp}>
            Don't have an account? <Button onClick={handleSignUp} color="primary">Sign Up</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LoginForm;
