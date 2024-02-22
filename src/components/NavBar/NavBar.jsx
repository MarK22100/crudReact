
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar expand="lg" className="px-3 bg-dark" data-bs-theme="dark">
        <NavLink className="navbar-brand" to="/">CRUD REACT</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/AboutUs">Acerca de nosotros</NavLink>
            <NavLink className="nav-link" to="/Administration">Administración</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};

export default NavBar;