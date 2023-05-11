import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../../services/apiService";
import Title from "../../components/Title";
import context from "react-bootstrap/esm/AccordionContext";
import { AppContext } from "../../App";
import './OneCard.css';

export interface ICardData {
    title: string,
    category: string,
    description: string,
    ingredients: string,
    address: string,
    phone: string,
    bizNumber: string,
    image: {
        url: string,
        alt: string
    }
    url: string
};

function OneCard() {
    const [title, setTitle] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { id } = useParams();
    const context = useContext(AppContext);

    const isLoggedIn = context !== null && context.userName.length > 0;
    const isLoggedInbiz = context !== null && context.isBiz;

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
                setCategory(json.category);
                setDescription(json.description);
                setIngredients(json.ingredients);
                setAddress(json.address);
                setPhone(json.phone);
                setImage(json.image.url);
            })
    }, [id]);

    return (
        <>
            <Title
                main="Card details"
                sub="Here you will find business card"
            />
            <div className="d-flex justify-content-center mt-5">
            <div className="card mb-3 mx-5">
                <div className="row g-0 ">
                    <div className="col-md-4 sizeCard">
                        <img src={image} className="img-fluid rounded-start " alt='' />
                    </div>
                    <div className="col-md-8 ">
                        <div className="card-body ">
                            <p className="card-title"><span className="text-success text-uppercase fw-bold">Product name:</span> {title} </p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Category:</span> {category}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Description:</span> {description}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Ingredients:</span> {ingredients}</p>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Address:</span> {address}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Phone:</span> {phone}</p><hr></hr>

                        </div>
                        <div className="d-flex justify-content-between mb-3">


                            {
                                  isLoggedInbiz &&
                                  <Link
                                  to="/cardslist"
                              >
                                  <button
                                      className="btn bg mx-3 "
                                  >
                                      list
                                  </button>
                              </Link>
                            }
                            <Link
                                to="/myFavorCards"
                            >
                                <button
                                    className="btn bg mx-3 "
                                >
                                    favor list
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            </div>


            {/* <div className="pb-5 ">
                <div className="col p-3 d-flex justify-content-center  ">
                    <div className=" card h-100 w-50 shadow-lg p-3 mb-5 bg-body rounded border border-warning  text-start">
                        <img src={image} className="card-img-top " alt='' />
                        <div className="card-body ">
                            <p className="card-title"><span className="text-success text-uppercase fw-bold">Product name:</span> {title} </p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Category:</span> {category}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Description:</span> {description}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Ingredients:</span> {ingredients}</p>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Address:</span> {address}</p><hr></hr>
                            <p className="card-text"><span className="text-success text-uppercase fw-bold">Phone:</span> {phone}</p><hr></hr>

                        </div>
                        <div className="d-flex justify-content-between">
                            <Link
                                to="/cardslist"
                            >
                                <button
                                    className="btn btn-info mt-2 "
                                >
                                    Go Back
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default OneCard;