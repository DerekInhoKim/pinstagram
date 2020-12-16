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
import Camera from './components/camera/Camera'
import DiscoverPage from './components/discoverpage/DiscoverPage'
import ProfilePictureUpload from './components/userpage/ProfilePicture'
import EditProfile from './components/userpage/EditProfile'
import { authenticate } from "./services/auth";
import {useDispatch} from 'react-redux'
import {getUserFollowers} from './services/user'
import {setFollowers} from './redux/actions/followers'
import {setFollowing} from './redux/actions/following'
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

        const userFollow = await getUserFollowers(user.id)
        dispatch(setFollowers(userFollow.followers))
        dispatch(setFollowing(userFollow.following))
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <ProtectedRoute path="/user/:userId" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <UserPage />
      </ProtectedRoute>
      <ProtectedRoute path="/camera" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <Camera />
      </ProtectedRoute>
      <ProtectedRoute path="/post/create" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <CreatePost />
      </ProtectedRoute>
      <ProtectedRoute path="/p/:postId" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <PostPage />
      </ProtectedRoute>
      <ProtectedRoute path="/discover" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <DiscoverPage />
      </ProtectedRoute>
      <ProtectedRoute path="/profilePicture" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <ProfilePictureUpload />
      </ProtectedRoute>
      <ProtectedRoute path="/edit/profile" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <EditProfile />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <NavBar setAuthenticated={setAuthenticated} />
        <HomePage/>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
