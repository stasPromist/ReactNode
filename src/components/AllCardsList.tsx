import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import { ICardData } from "../pages/Cards/CardsList";
import { getRequest, patchRequest } from "../services/apiService";

export interface Props {
    title: string,
    subTitle: string,
    address: string,
    phone: string,
    image: {
        url: string,
        alt: string
    },
    category: string,
    CategoryClick: Function;
};


function AllCardsList({ title, subTitle, address, phone, image: { url, alt }, category, CategoryClick }: Props) {
    const context = useContext(AppContext);
    const isLoggedIn = context !== null && context.userName.length > 0;
    const [cards, setCards] = useState<Array<ICardData>>([]);
    const navigate = useNavigate();

    function getCards() {
        const res = getRequest(`cardsAll`);
        console.log()
        if (!res) return;
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

    function moveTo(card: ICardData) {
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
            {
                cards.map(card =>
                    <div className="d-flex justify-content-center p-5 mb-5" key={card._id}>
                        <div className="card mb-3 m-5 g-4  w-50 ">
                            <div className="col">
                                <div className="card h-100 shadow-lg p-3 mb-5 bg-body rounded ">
                                    <img src={url} className="card-img-top" alt={alt} />
                                    <div className="card-body">
                                        <div className="badge text-bg-info"
                                            onClick={(e) => CategoryClick(title)}
                                        >{title}</div>
                                        <h5 className="card-title">{title}</h5>
                                        <p className="card-text">{subTitle}</p>
                                        <p className="card-text">{address}</p>
                                        <p className="card-text">{phone}</p>
                                        <p className="card-text">{category}</p>
                                    </div>
                                    {
                                        isLoggedIn &&
                                        <Link
                                            onClick={() => moveTo(card)}
                                            to={`/myFavorCards`}
                                        >
                                            <i className="bi bi-cloud-upload-fill"></i>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default AllCardsList;