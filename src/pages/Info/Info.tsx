import { NavLink } from "react-router-dom";
import Title from "../../components/Title/Title";

function Info() {
    return (
        <>
            <Title
                main="Helpful information"
                sub="how to use this site"
            />
            <div className="container pb-5 mb-5">
                <div className="container  fw-bold  mb-3">
                    <span className="bg">Three types of registration</span>
                </div>
                <div className="container">
                    <ul className="list-group list-group-numbered">
                        <li className="list-group-item text-primary fw-bold">Regular User
                            <NavLink className="nav-link active text-primary d-flex justify-content-end "
                                aria-current="page"
                                to="/signup">
                                Sign up as a regular user
                            </NavLink>
                            <ul className="list-group list-group-numbered">
                                <li className="list-group-item">Can see all cards.</li>
                                <li className="list-group-item">Can create your own favourite list. </li>
                            </ul>
                        </li>
                        <li className="list-group-item text-success fw-bold">Business User
                            <NavLink className="nav-link active text-primary d-flex justify-content-end text-success"
                                aria-current="page"
                                to="/business">
                                Sign up as a business user
                            </NavLink>
                            <ul className="list-group list-group-numbered">
                                <li className="list-group-item">Can see all cards.</li>
                                <li className="list-group-item">Can create your own favourite list.</li>
                                <li className="list-group-item">Can create your own cards.</li>
                                <li className="list-group-item">Can update your cards.</li>
                                <li className="list-group-item">Can delete your cards.</li>
                            </ul>
                        </li>
                        <li className="list-group-item text-danger fw-bold">Admin
                            <NavLink className="nav-link active text-primary d-flex justify-content-end text-danger"
                                aria-current="page"
                                to="/signin">
                                Log in as an admin user
                            </NavLink>
                            <ul className="list-group list-group-numbered">
                                <li className="list-group-item">Can see all cards.</li>
                                <li className="list-group-item">Can create your own favourite list.</li>
                                <li className="list-group-item">Can create your own cards.</li>
                                <li className="list-group-item">Can update your cards.</li>
                                <li className="list-group-item">Can delete your cards.</li>
                                <li className="list-group-item">Can see all users.</li>
                                <li className="list-group-item">Can delete users.</li>
                                <li className="list-group-item">Can update status of users.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Info;