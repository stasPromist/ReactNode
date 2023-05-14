import Title from "../../components/Title/Title";
import { NavLink } from "react-router-dom";
import './Entarence.css'
function Entarence() {

    return (<>
        <Title
            main="Beauty and Health"
            sub="Take care of yourself"
        />
        <div className="row row-cols-1 row-cols-md-2 g-4 mb-3">
            <div className="cont col container d-flex align-items-center justify-content-center">
                <div className="bottom-left "><h2 className="size color">Face</h2>
                    <img src="../images/face-2.webp" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="cont col container d-flex align-items-center justify-content-center">
                <div className="bottom-left "><h2 className="size color">Hair</h2>
                    <img src="../images/hair-1.webp" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="cont col container d-flex align-items-center justify-content-around">
                <div className="bottom-right "><h2 className="size color">Hand</h2>
                    <img src="../images/hands-1.webp" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="cont col container d-flex align-items-center justify-content-center">
                <div className="bottom-left "><h2 className="size color">Body</h2>
                    <img src="../images/body-1.webp" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="cont col container d-flex align-items-center justify-content-center">
                <div className="bottom-left "><h2 className="size color">Foot</h2>
                    <img src="../images/foots-5.webp" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="cont col container d-flex align-items-center justify-content-center">
                <div className="bottom-left "><h2 className="size color">Eyes</h2>
                    <img src="../images/eyes-1.jpg" className="img-fluid rounded-circle h-200 w-75  mb-5" alt="sunscreen" />
                </div>
            </div>
            <div className="container text-center mb-5">
                <div className="navbar-brand text-center">
                    <NavLink className="nav-link active colorText"
                        aria-current="page"
                        to="/info">
                        <h3>Want More?  Sign up </h3>
                    </NavLink>
                </div>
            </div>
        </div>
    </>);
}

export default Entarence;