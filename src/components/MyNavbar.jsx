/* import './MyNavbar.css'; */
import { Container } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/Auth/LoggedIn'
import LogoutButton from './LogoutButton';
import './style.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function MyNavbar() {

    /* const isLoggedIn = sessionStorage.getItem("loggedIn") === "true"; */
    /* Variabile redux store */
    const loggedIn = useSelector((state) => state.LoggedIn.value);
    const dispatch = useDispatch();
    let username_display = "/";

    if (loggedIn) {
      const username = JSON.parse(sessionStorage.getItem("userData"));
      username_display = username.username;
    } else {
      username_display = "/";
    }

    return (
      <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand>
          <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-palette-fill" viewBox="0 0 16 16">
              <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
              </svg>
          </Link>
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link> 
            <Nav.Link as={Link} to="/palette">Palette</Nav.Link> 
            <Nav.Link as={Link} to="/about">About</Nav.Link> 
          </Nav>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-bottom">Username: <strong>{username_display}</strong> </Tooltip>}>
          <Link className='float-end' to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
          </Link>
        </OverlayTrigger>
        {loggedIn? (<> <div className='float-end'> <LogoutButton/></div> </>) : (<></>)}
      </Container>
    </Navbar>
    );
}

export default MyNavbar;