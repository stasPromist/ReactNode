import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import { getRequest, patchRequest } from "../../services/apiService";
import Title from "../../components/Title/Title";
import './MyFavorCards.css';
import { ICardData } from "../types";

function MyFavorCards() {
    const [cards, setCards] = useState<Array<ICardData>>([]);
    const context = useContext(AppContext);
    const isLoggedInbiz = context !== null && context.isBiz;


    //Get all cards from favorite list of specific user
    function getCards() {
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
    
    //Delete card from favorite list 
    function delCardFromFavorList(card: ICardData) {
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
            <div className="maingrid p-5" >
                {
                    cards.length === 0 ? (
                        <>
                            <h2 className="container d-flex align-items-center justify-content-center">
                                <div className="d-block">
                                    <div className="text-danger mb-5">Sorry! No Content</div>
                                    <div className="text-success ">If you added to your list it will take a few seconds for the first time</div>
                                </div>
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
                                                <button
                                                    onClick={() => delCardFromFavorList(card)}
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
        </>
    );
}

export default MyFavorCards;