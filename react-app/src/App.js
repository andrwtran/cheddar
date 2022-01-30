import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/User/UsersList';
// import User from './components/User/User';
// import logo from '../src/images/cheddar-logo-small.png';
import Splash from './components/Splash/Splash';
import Footer from './components/Footer/Footer';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login'>
          {/* <img src={logo}></img> */}
          <LoginForm />
        </Route>
        <Route path='/sign-up'>
          {/* <img src={logo}></img> */}
          <SignUpForm />
        </Route>
        <Route path='/'>
          <Splash />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
