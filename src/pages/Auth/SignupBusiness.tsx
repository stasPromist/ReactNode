import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRequest } from "../../services/apiService";
import Title from "../../components/Title/Title";

interface ISignupData {
    name: string,
    email: string,
    password: string,
}

function Business() {
    const navigate = useNavigate();
    const [url, setUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            url: Joi.string().min(2).max(256),
            name: Joi.string().required().min(2).max(256),
            email: Joi.string().required().min(6).max(256).email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(30),
            isBiz: Joi.boolean().required(),
        });
        const { error, value } = schema.validate({
            name,
            email,
            password,
            isBiz: true,
        });
        if (error) {
            // setError(error.message);
            console.log(error.message)
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        register(value)
    }

    function register(data: ISignupData) {
        const res = postRequest(
            'users/signup',
            data,
            false,
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                if (json.error) {
                    toast.error(json.error,
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    return;
                }
                setUserName(name)
                navigate('/signin')
            })
    }

    return (
        <>
        {/* <div className="p-3 form-max-w m-auto was-validated"> */}
            <Title main="Sign up as a business user"
                sub="register to the application"
            />
             <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image mt-5">
                                        <img src="../images/sign-up.png" className="img-fluid mx-auto d-block" alt="sign up" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Create an account</h1>
                                            </div>
                                            <div className="p-3 form-max-w m-auto was-validated">
                                                <div className="">
                                                    <div className="form-check mb-3 ">
                                                        <label className="form-label" htmlFor="validationFormCheck1">Your photo</label>

                                                        <input
                                                            type="file"
                                                            //  id="myfile"
                                                            name="myfile"
                                                            id="basic-image" required
                                                            // type="text"
                                                            className="form-control"
                                                            placeholder="Image"
                                                            value={url}
                                                            onChange={(e) => setUrl(e.target.value)}
                                                        ></input>
                                                        <div className="invalid-feedback">optionally</div>
                                                    </div>
                                                    <div className="">
                                                        <div className="form-check mb-3 ">
                                                            <label className="form-label" htmlFor="validationFormCheck1">First Name</label>
                                                            <input
                                                                id="validationFormCheck1" required
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Name"
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            ></input>
                                                            <div className="invalid-feedback">Please enter a name.</div>
                                                        </div>
                                                        <div className="form-check mb-3">
                                                            <label className="form-label" htmlFor="validationFormCheck2">Email</label>
                                                            <input
                                                                type="email"
                                                                id="validationFormCheck2" required
                                                                className="form-control"
                                                                placeholder="Email"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                            ></input>
                                                            <div className="invalid-feedback">Please enter an email.</div>
                                                        </div>
                                                        <div className="form-check mb-3">
                                                            <label className="form-label" htmlFor="validationFormCheck3">Password</label>
                                                            <input
                                                                type="password"
                                                                id="validationFormCheck3" required
                                                                className="form-control"
                                                                placeholder="Password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                            ></input>
                                                            <div className="invalid-feedback">Please enter a password.</div>
                                                            <button
                                                                onClick={submit}
                                                                className="btn btn-primary bng-lg mt-3">
                                                                Sign Up
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
export default Business;

