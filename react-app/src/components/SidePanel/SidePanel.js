import React from 'react';
import "./SidePanel.css"

const SidePanel = () => {
  return (
    <div className='SidePanel'>
      <h2>Side Panel</h2>
      <div className='Accounts'><h3>Accounts</h3></div>
      <div className='Transactions'><h3>Transactions</h3></div>
    </div>
  );
};

export default SidePanel;
