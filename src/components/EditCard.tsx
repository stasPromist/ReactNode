import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../services/apiService";
import { ICardData } from "../pages/Cards/CardsList";
import Title from "./Title/Title";
import swal from "sweetalert";


function Edit() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [alt, setAlt] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { id } = useParams();

    //Show specific card by ID
    useEffect(() => {
        const res = getRequest(`cards/${id}`);
        if (!res) return;
        res.then(res => res.json())
            .then(json => {
                if (json.ok === false) {
                    setError('error get the data');
                    return;
                }
                setTitle(json.title);
                setCategory(json.subTitle);
                setDescription(json.description);
                setIngredients(json.ingredients);
                setAddress(json.address);
                setPhone(json.phone);
                setUrl(json.image.url);
                setAlt(json.image.alt);
            })
    }, [id]);


    function handleClick() {
        const schema = Joi.object().keys({
            title: Joi.string().min(2).max(256).required(),
            category: Joi.string().min(2).max(256).required(),
            description: Joi.string().min(2).max(1024).required(),
            ingredients: Joi.string().min(2).max(1024).required(),
            address: Joi.string().min(2).max(256).required(),
            phone: Joi.string().min(9).max(14).required(),
            image: {
                url: Joi.string().min(2).max(256).required(),
                alt: Joi.string().min(2).max(256).required(),
            }
        });

        const { error, value } = schema.validate({
            title,
            category,
            description,
            ingredients,
            address,
            phone,
            image: {
                url, alt
            }
        });

        if (error) {
            setError(error.message);
            return;
        }
        setError('');
        updateCard(value);
    }
    
    //Update card by ID
    function updateCard(card: ICardData) {
        const res = patchRequest(
            `cards/${id}`,
            card
        );
        if (!res) return;
        res.then(res => res.json())
            .then(json => {
                if (json.error) {
                    setError(json.error);
                    return;
                }
                swal({
                    icon: "success",
                });
                navigate('/cardslist')
            })
    }

    return (
        <>
            <Title
                main="Edit Your Card"
                sub=""
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
                                            Product name
                                        </label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Product name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Category
                                        </label>
                                        <input
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Category"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Description
                                        </label>
                                        <input
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Ingredients
                                        </label>
                                        <input
                                            value={ingredients}
                                            onChange={(e) => setIngredients(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Ingredients"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Business Address
                                        </label>
                                        <input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Business Address"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Business Phone
                                        </label>
                                        <input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Business Phone"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Image
                                        </label>
                                        <input
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Image"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-label">
                                            Alt
                                        </label>
                                        <input
                                            value={alt}
                                            onChange={(e) => setAlt(e.target.value)}
                                            className="form-control me-3"
                                            type="text"
                                            placeholder="Alt"
                                        />
                                    </div>
                                    <button
                                        onClick={handleClick}
                                        className="btn btn-info me-3"
                                    >
                                        Update
                                    </button>

                                    <Link
                                        to="/cardslist"
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                                {
                                    error &&
                                    <div className="text-danger">
                                        {error}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;


