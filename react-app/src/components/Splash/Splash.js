import React from "react";
import { useSelector } from 'react-redux';
import SidePanel from '../SidePanel/SidePanel';
import MainPanel from '../MainPanel/MainPanel';
import './Splash.css'

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) {
    return (
      <div className='HomeContainer'>
        <SidePanel />
        <MainPanel />
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
