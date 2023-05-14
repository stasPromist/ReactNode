import Joi from "joi";
import { useState } from "react";
import { toast } from "react-toastify";
interface Props {
    resetPassword: Function;
}

function ResetPassword({ resetPassword }: Props) {
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
        resetPassword(value);
    }



    return (<>
        <div className="container mt-5">
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
                                                <label className="form-label" htmlFor="validationFormCheck3">Create new password</label>
                                                <input
                                                    id="validationFormCheck3" required
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                ></input>
                                                <div className="invalid-feedback">Password invalid</div>
                                                <button
                                                    onClick={submit}
                                                    className="btn btn-primary bng-lg mt-3">
                                                    Login
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
    </>);
}

export default ResetPassword;