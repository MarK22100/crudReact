
import { Button, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Login from '../sections/Login';
import { useState } from 'react';

const NavBar = () => {

  
  const [isOpen, setIsOpen] = useState(false);

  const handleShow = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Login isOpen={isOpen} handleClose={handleClose}/>
        <Navbar expand="lg" className="px-3 bg-dark" data-bs-theme="dark">
        <NavLink className="navbar-brand" to="/">CRUD REACT</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/CreateProduct">Acerca de nosotros</NavLink>
            <NavLink className="nav-link" to="/Administration">Administración</NavLink>
          </Nav>
          <Nav className='gap-1'>
            <Button variant="primary" onClick={handleShow}>Login</Button>
            <Button variant="secondary" >LogOut</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
};

export default NavBar;