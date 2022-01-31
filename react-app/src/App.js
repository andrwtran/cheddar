import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
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
          <LoginForm />
        </Route>
        <Route path='/sign-up'>
          <SignUpForm />
        </Route>
        <Route path='/'>
          <Splash />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
