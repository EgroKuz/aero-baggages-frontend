import { Component } from "react";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

class BasicNavbar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src="/images/logo.png" alt="Logo" height="40" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={<span className="custom-dropdown-title">Страницы</span>}
                id="basic-nav-dropdown"
                align="end"
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/baggages">
                  Багажи
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default BasicNavbar;
