import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import { deleteRequest, getRequest, patchRequest } from "../../services/apiService";
import { Categories } from "../types";
import Title from "../../components/Title/Title";
import swal from "sweetalert";
import './CardList.css';

export interface ICardData {
    _id: number,
    title: string,
    description: string,
    ingredients: string,
    address: string,
    phone: string,
    bizNumber: string,
    createdAt: string,
    image: {
        url: string,
        alt: string
    },
    category: Categories;
};

export interface UserUp {
    _id: number,
    arrCards: []
}

function CardsList() {
    const navigate = useNavigate();
    const context = useContext(AppContext);
    const [cards, setCards] = useState<Array<ICardData>>([]);

    //Get all cards created by this user
    function getCards() {
        const res = getRequest(`cards/user/${context?.userName}`);

        if (!res) return;
        res.then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.error) {
                    toast.error('To craete your favourite list you must be a business user', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    return;
                }
                setCards(json);
            })
    }

    useEffect(getCards, []);
    
    //Remove card from list(this is not a favorite list)
    function deleteCard(card: ICardData) {
        const res = deleteRequest(
            `cards/${card._id}`,
        );
        if (!res) return;
        res.then(response => response.json())
            .then(async json => {
                const updated = [...cards].filter(cardItem =>
                    cardItem._id !== card._id
                )
                setCards(updated);
                swal({
                    icon: "success",
                });
            })
    }

    //Add card to favorite list
    function moveToFavList(card: ICardData) {
        const res = patchRequest(
            `users/favCards/${card._id}`,
            { ...card, currentId: context?.userName }
        );
        if (!res) return;
        res.then(response => response.json())
            .then(json => {
                navigate('/myFavorCards');
            })
    }


    return (
        <>
            <Title
                main="Your Cards List"
                sub="Have been created by you"
            />
            <div className="maingrid p-5 " >
                {

                    cards.length === 0 ? (
                        <>
                            <h2 className="container d-flex align-items-center justify-content-center">
                                <p className="text-danger">Sorry! No Content</p>
                            </h2>
                            <div className=" d-flex align-items-center justify-content-center ">
                                <div className="">
                                    <img src="../images/oops5.webp" />
                                </div>
                            </div>
                        </>) : (
                        cards.map(card =>
                            <div key={card._id}>
                                <div className="pb-5 ">
                                    <div className="col p-5 d-flex justify-content-center">
                                        <div className=" shadow-lg p-3 mb-5 bg-body rounded">
                                            <img src={card.image.url} className="figure-img img-fluid rounded sizePicture" alt={card.image.alt} />
                                            <div className="card-body">
                                                <p className="card-title mb-2">
                                                    <span className="text-success text-uppercase fw-bold">Product name:</span> {card.title} </p>
                                                <p className="card-text">
                                                    <span className="text-success text-uppercase fw-bold">Category:</span> {card.category}</p>
                                            </div>
                                            <hr></hr>
                                            <div className="card-footer mt-4 d-flex justify-content-between">
                                                <Link
                                                    to={`/edit/${card._id}`}
                                                    className="btn btn-default"
                                                >
                                                    <i className="bi-pen text-warning ">change content</i>
                                                </Link>
                                                <button
                                                    onClick={() => deleteCard(card)}
                                                    className="btn btn-default ">
                                                    <i className=" bi-trash text-danger">delete</i>
                                                </button>
                                                <Link
                                                    to={`/oneCard/${card._id}`}
                                                    className="btn btn-default text-primary"
                                                >
                                                    <i className="bi bi-folder2-open">more info</i>
                                                </Link>
                                                <Link
                                                    className="btn btn-default text-success"
                                                    onClick={() => moveToFavList(card)}
                                                    to={`/myFavorCards`}
                                                >
                                                    <i className="bi bi-person-lines-fill">add to favour list</i>
                                                </Link>
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

export default CardsList;