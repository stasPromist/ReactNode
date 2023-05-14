import Joi from "joi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../Auth/Token";
import { postRequest } from "../../services/apiService";
import Title from "../../components/Title/Title";
import swal from "sweetalert";

export interface ICardData {
    title: string,
    description: string,
    ingredients: string,
    address: StaticRangeInit,
    phone: string,
    url: string,
    category: string,
    price: string
}

function Businesscard() {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [price, setPrice] = useState<string>('');


    function submit() {
        console.log('hello');
        const schema = Joi.object().keys({
            title: Joi.string().min(2).max(256).required(),
            description: Joi.string().min(2).max(1024).required(),
            ingredients: Joi.string().min(2).max(1024).required(),
            address: Joi.string().min(2).max(256).required(),
            phone: Joi.string().min(9).max(14).required(),
            url: Joi.string().min(2).max(256).required(),
            category: Joi.string().min(2).max(256).required(),
            price: Joi.string().min(1).max(7).required(),

        });

        const { error, value } = schema.validate({
            title,
            description,
            ingredients,
            address,
            phone,
            url,
            category,
            price
        });
        if (error) {
            console.log('ededde');
            console.log(error.message);
            return;
        }
        register(value);
    }



    function register(data: ICardData) {
        const res = postRequest(
            'cards',
            data,
            true,
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                console.log(json)
                swal({
                    icon: "success",
                });
                if (json.error) {
                    setToken(json.token);
                    return;
                }
                navigate('/cardslist')
            })
    }
    return (
        <>
            <Title main="Create you card"
                sub="Open product card"
            />
            <div className="form-max-w m-auto">
                <div className="container mb-5">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="bg-light m-4 was-validated">
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-name" className="form-label">Name of Product</label>
                                            <input
                                                id="basic-name" required
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Name invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-phone" className="form-label">Category</label>
                                            <input
                                                id="basic-phone" required
                                                type="text"
                                                className="form-control"
                                                placeholder="03-9344455"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Category invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-description" className="form-label">Description</label>
                                            <input
                                                id="basic-description" required
                                                type="text"
                                                className="form-control"
                                                placeholder=" Description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Description invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-ingredients" className="form-label">Ingredients</label>
                                            <input
                                                id="basic-ingredients" required
                                                type="text"
                                                className="form-control"
                                                placeholder="Ingredients"
                                                value={ingredients}
                                                onChange={(e) => setIngredients(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Ingredients invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-address" className="form-label">Business Address</label>

                                            <input
                                                id="basic-address" required
                                                type="text"
                                                className="form-control"
                                                placeholder="Business Address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Address invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-phone" className="form-label">Business Phone</label>
                                            <input
                                                id="basic-phone" required
                                                type="text"
                                                className="form-control"
                                                placeholder="03-9344455"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Phone invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-image" className="form-label">Business Image</label>
                                            <input
                                                id="basic-image" required
                                                type="text"
                                                className="form-control"
                                                placeholder="Image"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Image invalid</div>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <label htmlFor="basic-price" className="form-label">Price</label>
                                            <input
                                                id="basic-price" required
                                                type="text"
                                                className="form-control"
                                                placeholder="price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            ></input>
                                            <div className="invalid-feedback">Price invalid</div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                onClick={submit}
                                                className="btn bg bng-lg">
                                                Create Card
                                            </button>
                                            <Link
                                                to="/cardslist"
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
            </div>
        </>
    );
}

export default Businesscard;