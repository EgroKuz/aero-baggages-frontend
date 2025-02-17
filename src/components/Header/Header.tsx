import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css'; // Убедитесь, что этот файл есть
import '../Navbar/Navbar';

const Header: React.FC = () => {
    return (
        <header>
            <Link to="/" className="baggage-link">
                <div className="logo">  
                    <img src="./logo.png" alt="Логотип" />
                    <h1>Аэробагажник</h1>
                </div>
            </Link>
            <div className="header-center">
                <Navbar expand="lg" className="navbar">
                    <Container>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto nav-links">
                                <Nav.Link as={Link} to="/baggages" className="nav-link">Багажи</Nav.Link>
                                <Nav.Link as={Link} to="/login" className="nav-link">Логин</Nav.Link>
                                <Nav.Link as={Link} to="/profile" className="nav-link">Профиль</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="nav-link">Выйти</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link">Регистрация</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;