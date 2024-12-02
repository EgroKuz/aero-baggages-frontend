import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css'; // Убедитесь, что этот файл есть
import '../Navbar/Navbar'; // Убедитесь, что стиль для Navbar корректный

const Header: React.FC = () => {
    return (
        <header>
            <Link to="/baggages" className="baggage-link">
                <div className="logo">
                    <h1>Аэробагажник</h1>
                </div>
            </Link>
            <div className="header-center">
                <Navbar expand="lg" className="navbar">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto nav-links">
                                <Nav.Link as={Link} to="/baggages" className="nav-link">Багажи</Nav.Link>
                                <Nav.Link as={Link} to="/" className="nav-link">Домой</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;