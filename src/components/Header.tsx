
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../Auth/Logout";
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

            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <ul className="navbar-nav d-flex">
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav">
                                <li aria-current="page" className="navbar-brand nav-link">
                                    <NavLink className="nav-link active bg-white text-dark rounded-pill" to="/">
                                        Business Cards App
                                    </NavLink>
                                </li>

                                <li aria-current="page" className="navbar-brand nav-link" >
                                    <NavLink className="nav-link active  " to="/about">


                                        About
                                    </NavLink>

                                </li>

                                {
                                    isLoggedIn &&
                                    <>
                                        <div className="d-flex ">
                                            <li className="navbar-brand " >
                                                <NavLink className="nav-link active text-warning"
                                                    aria-current="page"
                                                    to="/businesscard">
                                                    Craeate Card
                                                </NavLink>
                                            </li>
                                            <li className="navbar-brand" >
                                                <NavLink className="nav-link active text-info"
                                                    aria-current="page"
                                                    to="/cardslist">
                                                    My Cards
                                                </NavLink>

                                            </li>
                                            <li className="navbar-brand" >
                                                <NavLink className="nav-link active text-primary"
                                                    aria-current="page"
                                                    to="/myFavorCards">
                                                    My Favorite Cards
                                                </NavLink>

                                            </li>
                                            <li className="navbar-brand" >
                                                <NavLink className="nav-link active text-info"
                                                    aria-current="page"
                                                    to="/AllUsers">
                                                    All Users
                                                </NavLink>

                                            </li>

                                        </div>

                                    </>
                                }
                            </div>
                        </div>
                    </ul>
                    <ul className="navbar-nav d-flex">

                        {
                            !isLoggedIn &&
                            <>
                                <li className="navbar-brand">
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/signup">
                                        Sign up
                                    </NavLink>
                                </li>
                                <li className="navbar-brand">
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/signin">
                                        Sign in
                                    </NavLink>
                                </li>

                                <li className="navbar-brand" >
                                    <NavLink className="nav-link active"
                                        aria-current="page"
                                        to="/business">
                                        Business
                                    </NavLink>
                                </li>

                            </>
                        }

                        {
                            isLoggedIn &&
                            <li className="nav-link active  ">
                                <Logout />
                            </li>
                        }

                    </ul>

                </div>

            </nav> */}



            <Navbar  expand="lg" className="bg fixed-top">
                <Container >

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light "/>
                    {/* <Navbar.Brand className="text-primary " href="/">Business Cards App</Navbar.Brand>
                    <Navbar.Brand className="text-warning" href="/about">About</Navbar.Brand> */}
                    <Navbar.Collapse id="basic-navbar-nav" className="navbar  justify-content-around">
                        {/* <Nav className="justify-content-between"> */}
                        {/* <Nav.Link href="/about">About</Nav.Link> */}
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <Navbar.Brand className="text-danger">
                            <NavDropdown title="MENU" id="basic-nav-dropdown" className="colorText">
                                <ul className="navbar-nav d-flex">
                                    {/* <div className="collapse navbar-collapse" id="navbarCollapse">
                                    <div className="navbar-nav"> */}
                                    <li aria-current="page" className="navbar-brand nav-link text-center ">
                                        <NavLink className="nav-link active  text-warning rounded-pill" to="/">
                                            All cards
                                        </NavLink>
                                    </li>

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
                                             

                                            {/* <div className="d-flex "> */}
                                            <li className="navbar-brand text-center" >
                                                            <NavLink className="nav-link active text-warning"
                                                                aria-current="page"
                                                                to="/myFavorCards">
                                                                My Favorite Cards
                                                            </NavLink>
                                                        </li>


                                                {

                                                    // isLoggedInbiz &&
                                                    // <>

                                                      
                                                    // </>
                                                }
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
                                                       
                                                        {/* <li className="navbar-brand" >
                                                 <NavLink className="nav-link active text-primary"
                                                     aria-current="page"
                                                     to="/showuser">
                                                     One User
                                                 </NavLink>
                                             </li> */}
                                                    </>
                                                }

                                            {/* </div> */}
                                        </>
                                    }
                                    {/* </div>
                                </div> */}
                                </ul>

                            </NavDropdown>

                        </Navbar.Brand>
                        <Navbar.Brand className="text-danger">
                            {
                                !isLoggedIn &&
                                <NavDropdown title="AUTH  MENU" id="basic-nav-dropdown" className="colorText" >
                                    <ul className="navbar-nav d-flex ">
                                        {/* {
                                            !isLoggedIn && */}
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

                        {/* </Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;