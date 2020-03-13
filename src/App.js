import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Logo from './img/logo.png';
import DashboardBody from './components/DashboardBody';

function App() {
  return (
    <div>
      <Navbar color="faded" light expand="lg" style={{borderBottom : "1px solid #ededed", marginBottom: 20}}>
        <NavbarBrand href="/" style={{fontWeight: 'bold'}}>
          <img src={Logo} alt="Logo" style={{height: 35}} />Dashboard Social Media
        </NavbarBrand>
      </Navbar>
      <DashboardBody />
    </div>
  );
}

export default App;
