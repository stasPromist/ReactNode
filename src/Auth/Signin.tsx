import Joi from "joi";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { send } from "process";
import { Link } from "react-router-dom";

interface Props {
    handler: Function;
    handleLog:Function
}


function Signin({ handler, handleLog }: Props) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    function submit() {
        const schema = Joi.object().keys({
            email: Joi.string().required().min(6).max(256).email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(30),

        });

        const { error, value } = schema.validate({

            email,
            password
        });
        if (error) {
            // setError(error.message);
            console.log(error.message)
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            }); return;

        }

        handler(value);
    }

    function changePassword() {
        console.log(email,password)
       
    }
    // useEffect(() => {

    //     const timer = setTimeout(() => {
    //         handleLog();
    //       console.log('This will run after 1 second!')
    //     }, 10000);
       
    //     return () => clearTimeout(timer);
    //   }, []);
    


    return (
        <>
            <Title main="Login"
                sub=""
            />
            <div className="container">
                {/* <div className="">
              
                    <img src="../images/permission.png" className="img-fluid mx-auto d-block" alt="Login" />
               
                <div className=" form-max-w m-auto was-validated">
                    <div className="mb-3 form-check">
                        <label className="form-label" htmlFor="validationFormCheck2">Email</label>

                        <input
                            id="validationFormCheck2" required
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <div className="invalid-feedback">Email invalid</div>

                    </div>
                    <div className="mb-3 form-check">
                        <label className="form-label" htmlFor="validationFormCheck3">Please enter an email</label>

                        <input
                            id="validationFormCheck3" required

                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <div className="invalid-feedback">Please enter a password.</div>

                    </div>
                    <button
                        onClick={submit}
                        className="btn btn-primary bng-lg">
                        Login
                    </button>
                </div>
            </div>
            </div>
 */}





                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block bg-login-image">
                                            <img src="../images/permission.png" className="img-fluid mx-auto d-block" alt="Login" />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                </div>
                                                <div className=" form-max-w m-auto was-validated">
                                                    <div className="mb-3 form-check">
                                                        <label className="form-label" htmlFor="validationFormCheck2">Email</label>
                                                        <input
                                                            id="validationFormCheck2" required
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        ></input>
                                                        <div className="invalid-feedback">Email invalid</div>
                                                    </div>
                                                    <div className="mb-3 form-check">
                                                        <label className="form-label" htmlFor="validationFormCheck3">Please enter an email</label>
                                                        <input
                                                            id="validationFormCheck3" required
                                                            type="password"
                                                            className="form-control"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        ></input>
                                                        <div className="invalid-feedback">Please enter a password.</div>
                                                        <button
                                                            onClick={submit}
                                                            className="btn btn-primary bng-lg mt-3">
                                                            Login
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                

                                                className="text-center pointer">
                                                    
                                                <Link to="../resetpassword" className="small pointer" >Forgot Password?</Link>
                                            </div>
                                            {/* <div className="text-center">
                                                <a className="small" href="register.html">Create an Account!</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </>
    );
}



export default Signin;

