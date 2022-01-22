import React from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SidePanel from '../SidePanel/SidePanel';
import MainPanel from '../MainPanel/MainPanel';
import TransactionList from "../TransactionList/TransactionList";
import './Splash.css'

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <div className='HomeContainer'>
        <SidePanel />
        {/* <MainPanel /> */}
        <TransactionList />
      </div>
    );
  } else {
    return (
      <div className="Splash">
      </div>
    );
  }

};

export default Splash;
