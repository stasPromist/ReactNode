import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import { getRequest, patchRequest } from "../services/apiService";
import Title from "./Title";
// import { json } from "stream/consumers";
import swal from "sweetalert";
import './MyFavorCards.css';
import { Categories, ICardData } from "../pages/types";

// export interface ICardData {
//     _id: number,
//     title: string,
//     // subTitle: string,
//     description: string,
//     ingredients: string,
//     address: string,
//     phone: string,
//     bizNumber: string,
//     image: {
//         url: string,
//         alt: string
//     },
//     category: Categories,
//     createdAt: string
// };

function MyFavorCards() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cards, setCards] = useState<Array<ICardData>>([]);
    const context = useContext(AppContext);
    const isLoggedInbiz = context !== null && context.isBiz;

    function getCards() {
        // const currentId = context?.userName;
        const res = getRequest(`users/${context?.userName}/favCards`);
        if (!res) return
        res.then(response => response.json())
            .then(json => {
                console.log(json)
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
                setCards(json);
            })
    }

    useEffect(getCards, []);

    function delCardFavor(card: ICardData) {
        const res = patchRequest(`users/delFavCards/${card._id}`, {
            ...card, currentId: context?.userName,
        });
        if (!res) return;
        res.then(response => response.json())
            .then(json => {

                const updated = [...cards].filter(cardItem =>
                    cardItem._id !== card._id
                )
                setCards(updated);

            })
    }

    return (
        <>
            <Title
                main="My Favorite Cards"
                sub="Here you will find your favourite products"
            />


            <div className="grid1 p-5" >
                {

                    cards.length === 0 ? (
                        <>
                            <h2 className="container d-flex align-items-center justify-content-center">
                                <p className="text-danger">Sorry! No Content</p>
                            </h2>
                            <div className=" d-flex align-items-center justify-content-center">
                                <div>
                                <img src="../images/oops5.webp" />
                                </div>
                            </div>
                        </>) : (
                        cards.map(card =>
                            <div key={card._id}>
                                <div className="pb-5 wit">
                                    <div className="col p-5 d-flex justify-content-center  ">
                                        <div className=" shadow-lg p-3 mb-5 bg-body rounded">
                                            <img src={card.image.url} className="figure-img img-fluid rounded sizePicture" alt={card.image.alt} />
                                            <div className="card-body">
                                                <p className="card-title mb-2">
                                                    <span className="text-success text-uppercase fw-bold">Product name:</span> {card.title} </p>
                                                <p className="card-text">
                                                    <span className="text-success text-uppercase fw-bold">Category:</span> {card.category}</p>
                                            </div>
                                            <hr></hr>
                                            <div className="card-footer d-flex justify-content-between">
                                                {/* <small className="text-muted">{card.createdAt}</small> */}
                                                <button
                                                    onClick={() => delCardFavor(card)}
                                                    className="btn btn-default  text-danger">
                                                    <i className=" bi-trash"></i>
                                                </button>
                                                <Link
                                                    to={`/oneCard/${card._id}`}
                                                    className="btn btn-default text-primary"
                                                >
                                                    <i className="bi bi-folder2-open">more info</i>
                                                </Link>
                                                <div className="d-flex justify-content-between">


                                                    {
                                                        isLoggedInbiz &&
                                                       

                                                            <Link
                                                                to="/cardslist"
                                                            >
                                                                <button
                                                                    className="btn bg mx-3"
                                                                >
                                                                    list
                                                                </button>
                                                            </Link>
                                                       
                                                    }
                                                    {/* <Link
                                                    to="/myFavorCards"
                                                >
                                                    <button
                                                        className="btn btn-info mt-2 float-end "
                                                    >
                                                         my favour list
                                                    </button>
                                                </Link> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>













            {/* 
            <div className="grid1 p-5" >
                {
                    cards.length === 0 ? (
                        <>
                            <h2 className="container d-flex align-items-center justify-content-center">
                                <p className="text-danger">Sorry! No Content</p>
                            </h2>
                            <div className=" d-flex align-items-center justify-content-center">
                                <div>
                                    <img src="https://th.bing.com/th/id/R.be5ec6632b2c0809281656e1e51d5574?rik=i3v0SZdgyl%2fUAw&pid=ImgRaw&r=0" />

                                </div>
                            </div>
                        </>) : (
                        cards.map(card =>
                          
                            <div key={card._id}>
                               <div className="pb-5 ">
                            <div className="col p-5 d-flex justify-content-center  ">
                                <div className=" shadow-lg p-3 mb-5 bg-body rounded">
                                            <img src={card.image.url} className="card-img-top" alt={card.image.alt} />
                                            <div className="card-body">
                                                <p className="card-title"><span className="text-success text-uppercase fw-bold">Product name:</span> {card.title} </p>
                                                <p className="card-text"><span className="text-success text-uppercase fw-bold">Category:</span> {card.category}</p>
                                                <p className="card-text"><span className="text-success text-uppercase fw-bold">Description:</span> {card.description}</p>
                                                <p className="card-text"><span className="text-success text-uppercase fw-bold">Ingredients:</span> {card.ingredients}</p>
                                                <p className="card-text"><span className="text-success text-uppercase fw-bold">Address:</span> {card.address}</p>
                                                <p className="card-text"><span className="text-success text-uppercase fw-bold">Phone:</span> {card.phone}</p>
                                            </div>
                                            <div className="card-footer">
                                               
                                                <button
                                                    onClick={() => delCardFavor(card)}
                                                    className="btn btn-default  text-danger">
                                                    <i className=" bi-trash"></i>
                                                </button>
                                                <Link
                                                    to="/cardslist"
                                                >
                                                    <button
                                                        className="btn btn-info mt-2 float-end "
                                                    >
                                                        Go Back
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))
                }

            </div> */}






        </>
    );
}

export default MyFavorCards;