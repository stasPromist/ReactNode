import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../../components/Title/Title";
import { getRequest, patchRequest } from "../../services/apiService";
import { toast } from "react-toastify";
import Joi from "joi";
import { ISignupData } from "../Auth/Signup";
import swal from "sweetalert";

function ShowUser() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [isBiz, setIsBiz] = useState<string>('');
    const [favCards, setFavCards] = useState<[]>();
    const { id } = useParams();

    //Show specific user by ID
    useEffect(() => {
        const res = getRequest(`users/${id}`);
        if (!res) return;
        res.then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.ok === false) {
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
                setName(json.name);
                setEmail(json.email);
                setIsBiz(json.isBiz);
                setFavCards(json.favCards)
            })
    }, [id]);

    function handleClick() {
        const schema = Joi.object().keys({
            isBiz: Joi.boolean().required(),
        });
        const { error, value } = schema.validate({
            isBiz
        });
        if (error) {
            return;
        }
       
        updateUser(value);

    }

    function updateUser(user: ISignupData) {
        const res = patchRequest(
            `users/${id}`,
            user
        );
        if (!res) return;
        res.then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.error) {
                    // setError(json.error);
                    return;
                }
                toast.info('Successfully updated', {
                    position: toast.POSITION.TOP_CENTER
                });
                console.log(json)
                navigate('/AllUsers')
            })
    }


    return (
        <>
            <Title
                main="Update User"
                sub="you can update only rules ( isBiz: true or false )"
            />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="bg-light m-4">
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Name
                                        </label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Location"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Email
                                        </label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Location"
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            isBiz
                                        </label>
                                        <input
                                            value={isBiz}
                                            onChange={(e) => setIsBiz(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Location"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            onClick={handleClick}
                                            className="btn bg me-3"
                                        >
                                            Update
                                        </button>
                                        <Link
                                            to="/AllUsers"
                                            className="btn bg"
                                        >
                                            Cancel
                                        </Link>
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

export default ShowUser;