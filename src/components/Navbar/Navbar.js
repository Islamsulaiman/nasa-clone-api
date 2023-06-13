import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css"
import { Link } from 'react-router-dom';

function NavCom() {
  return (
    <Navbar className='navbar' bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">GalaxyGalleria</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#action1">About</Nav.Link>

      
          </Nav>
          <Nav>
                <Nav.Link as={Link} to="/registration" className="d-flex">
                    Register
                </Nav.Link>
          <Nav.Link as={Link} to="/login" className="d-flex">
            Login
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavCom;