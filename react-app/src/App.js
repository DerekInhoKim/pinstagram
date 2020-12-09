import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from './components/homepage/Homepage'
import PostPage from './components/postpage/Postpage'
import CreatePost from './components/createpost/CreatePost'
import UserPage from './components/userpage/UserPage'
import { authenticate } from "./services/auth";
import {useDispatch} from 'react-redux'
import {setUser} from './redux/actions/users'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        dispatch(setUser(user));
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
        <UserPage />
      </ProtectedRoute>
      <ProtectedRoute path="/post/create" exact={true} authenticated={authenticated}>
        <CreatePost />
      </ProtectedRoute>
      <ProtectedRoute path="/p/:postId" exact={true} authenticated={authenticated}>
        <PostPage />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <HomePage/>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
