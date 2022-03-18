import React from "react";
import { useSelector } from 'react-redux';
import SidePanel from '../SidePanel/SidePanel';
import MainPanel from '../MainPanel/MainPanel';
import FilterProvider from "../../context/FilterContext";
import './Splash.css'

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  return sessionUser
    ?
    <div className='HomeContainer'>
      <FilterProvider>
        <SidePanel />
        <MainPanel />
      </FilterProvider>
    </div>
    :
    <div className="Splash"></div>
};

export default Splash;
