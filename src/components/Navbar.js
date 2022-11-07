import { Nav, Navbar, Container, Button, Stack} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import "./Navbar.css"
import Logo from "../images/logo.svg"

function NavigationBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/purchase"> <img src={Logo} width="70px" height="50px" alt="Logo"/> </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/purchase">Покупка</Nav.Link>
                    <Nav.Link as={ Link } to="/rent">Аренда</Nav.Link>
                    <Nav.Link as={ Link } to="/sale">Продажа</Nav.Link>
                    <Nav.Link as={ Link } to="/about">О проекте</Nav.Link>
                </Nav>
                <Nav>
                    <Stack direction="horizontal" gap={2} className="right-btn">
                        <Button as="a" variant="outline-warning" href="/sale">
                            + Разместить объявление
                        </Button>
                        <Button as="a" variant="outline-light" href="/account">
                            Войти
                        </Button>
                    </Stack>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;