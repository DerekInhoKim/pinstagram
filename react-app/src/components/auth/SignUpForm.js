import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signUp } from '../../services/auth';
import {setUser} from '../../redux/actions/users'
import {Button, TextField} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  buttonStyle: {
    fontWeight: "bold",
    color: "white",
    marginTop: "15px",
    width: "15rem",
    // border: ".5px solid gray"
  },
  border: {
    // borderWidth: "thin",
    // borderColor: "black",
    border: "1px solid lightgray",
    borderRadius: "2px",
    width: "25rem",
    height: "30rem",
    position: "relative",
    // top: "5rem",
    paddingBottom: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },
  input: {
    color: "black"
  },
  textField: {
    marginTop: "10px"
  },
  logIn: {
    marginTop: "3px",
    border: "1px solid lightgray",
    borderRadius: "2px",
    width: "25rem",
    height: "5rem",
    position: "relative",
    top: "1rem",
    marginBottom: "5px",
    display: "flex",
    flexDirection: "",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    fontWeight: "200",
    // flexDirection: "column",
    backgroundColor: "white",
  },
  headerText: {
    fontFamily: "Arial",
    fontSize: "14px",

  }

})

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fullname, setFullname] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const classes = useStyles()

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(fullname, username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setUser(user))
      }
    }
  };

  const updateFullname = (e) => {
    setFullname(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleLogin = () => {
    history.push("/login")
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup_container">
      <div className="signin_form_container">
        <form className={classes.border} onSubmit={onSignUp}>
          <p className="signup_form_header">Pinstagram</p>
          <div className={classes.headerText}>Sign up to see photos and pins from your friends.</div>
          <div>
            <TextField
              InputProps={{ disableUnderline: true }}
              className={classes.textField}
              id="standard-basic"
              label="Full Name"
              variant="outlined"
              type="text"
              name="fullname"
              InputProps={{className: classes.input}}
              onChange={updateFullname}
              value={fullname}
            />
          </div>
          <div>
            <TextField
              InputProps={{ disableUnderline: true }}
              className={classes.textField}
              id="standard-basic"
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            />
          </div>
          <div>
            <TextField
              InputProps={{ disableUnderline: true }}
              id="standard-basic"
              className={classes.textField}
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div>
            <TextField
              InputProps={{ disableUnderline: true }}
              className={classes.textField}
              id="standard-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div>
            <TextField
              InputProps={{ disableUnderline: true }}
              id="standard-basic"
              className={classes.textField}
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            />
          </div>
          <Button className={classes.buttonStyle} color="primary" variant="contained" type="submit">Sign Up</Button>
          {/* <button type="submit">Sign Up</button> */}
        </form>
        <div className={classes.logIn}>
              Already have an account? <Button onClick={handleLogin} color="primary">Login</Button>
        </div>
      </div>

    </div>
  );
};

export default SignUpForm;
