
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../App";
import Logout from "../../pages/Auth/Logout";
import './Header.css';
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
function Header() {
    const context = useContext(AppContext);
    const isLoggedIn = context !== null && context.userName.length > 0;
    const isLoggedInbiz = context !== null && context.isBiz;
    const isLoggedInadmin = context !== null && context.isAdmin;

    return (
        <>
            <Navbar expand="lg" className="bg fixed-top">
                <Container >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light " />
                    <Navbar.Collapse id="basic-navbar-nav" className="navbar  justify-content-around">
                        <Navbar.Brand className="text-danger">
                            <NavDropdown title="MENU" id="basic-nav-dropdown" className="colorText">
                                <ul className="navbar-nav d-flex">
                                    {
                                        isLoggedIn &&
                                        <li aria-current="page" className="navbar-brand nav-link text-center ">
                                            <NavLink className="nav-link active  text-warning rounded-pill" to="/">
                                                All cards
                                            </NavLink>
                                        </li>
                                    }
                                    {
                                        !isLoggedIn &&
                                        <li aria-current="page" className="navbar-brand nav-link text-center ">
                                            <NavLink className="nav-link active  text-warning rounded-pill" to="/entarence">
                                                Home
                                            </NavLink>
                                        </li>
                                    }
                                    <li aria-current="page" className="navbar-brand nav-link text-center" >
                                        <NavLink className="nav-link active text-warning " to="/about">
                                            About
                                        </NavLink>
                                    </li>
                                    <li aria-current="page" className="navbar-brand nav-link text-center" >
                                        <NavLink className="nav-link active text-warning " to="/info">
                                            Info
                                        </NavLink>
                                    </li>
                                    {
                                        isLoggedIn &&
                                        <>
                                            {
                                                isLoggedInbiz &&
                                                <>
                                                    <li className="navbar-brand text-center" >
                                                        <NavLink className="nav-link active text-warning "
                                                            aria-current="page"
                                                            to="/businesscard">
                                                            Craeate Card
                                                        </NavLink>
                                                    </li>
                                                    <li className="navbar-brand text-center" >
                                                        <NavLink className="nav-link active text-warning "
                                                            aria-current="page"
                                                            to="/cardslist">
                                                            My Cards
                                                        </NavLink>
                                                    </li>
                                                </>
                                            }
                                            <li className="navbar-brand text-center" >
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/myFavorCards">
                                                    My Favorite Cards
                                                </NavLink>
                                            </li>
                                            {
                                                isLoggedInadmin &&
                                                <>
                                                    <div>
                                                        <li className="navbar-brand text-center" >
                                                            <NavLink className="nav-link active text-warning"
                                                                aria-current="page"
                                                                to="/AllUsers">
                                                                All Users
                                                            </NavLink>
                                                        </li>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    }
                                </ul>
                            </NavDropdown>
                        </Navbar.Brand>
                        <Navbar.Brand className="text-danger">
                            {
                                !isLoggedIn &&
                                <NavDropdown title="AUTH  MENU" id="basic-nav-dropdown" className="colorText" >
                                    <ul className="navbar-nav d-flex ">
                                        <>
                                            <li className="navbar-brand text-center">
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/signup">
                                                    Sign up
                                                </NavLink>
                                            </li>
                                            <li className="navbar-brand text-center">
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/signin">
                                                    Log in
                                                </NavLink>
                                            </li>
                                            <li className="navbar-brand text-center" >
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/business">
                                                    Sign up (business)
                                                </NavLink>
                                            </li>
                                            <li className="navbar-brand text-center">
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/signin">
                                                    Admin
                                                </NavLink>
                                            </li>
                                        </>
                                    </ul>
                                </NavDropdown>
                            }
                            {
                                isLoggedIn &&
                                <Logout />
                            }
                        </Navbar.Brand>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;