// import { any } from "joi";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import AllCardsList from "../../components/AllCardsList";
import ButtonBars from "../../components/ButtonBars";
// import Cards from "../../components/Cards";
import Title from "../../components/Title";
import { getRequest, patchRequest } from "../../services/apiService";
// import { data } from "../../data";
import { ICardData } from "../Cards/CardsList";
// import { data } from "./data";
// import { data } from "./data";
import './Home.css';
import { Categories } from "../types";
import { AppContext } from "../../App";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Entarence from "../../components/Entarence";
// import Entarence from "../../components/Entarence";
import swal from "sweetalert";


// const data: any = [];

// function Home() {





//     const [cards, setCards] = useState<Array<ICardData>>([]);

//     function getCards() {

//         const res = getRequest(`cardsAll`);
//         console.log()

//         if (!res) return;
//         res.then(response => response.json())
//             .then(json => {
//                 console.log(json)
//                 if (json.error) {
//                     toast.error(json.error,
//                         {
//                             position: "top-center",
//                             autoClose: 5000,
//                             hideProgressBar: false,
//                             closeOnClick: true,
//                             pauseOnHover: true,
//                             draggable: true,
//                             progress: undefined,
//                             theme: "colored",
//                         });
//                     return;
//                 }

//                 setCards(json);

//             })
//     }
//     useEffect(getCards, []);




//     const [display, setDisplay] = useState('grid');
//     const [search, setSearch] = useState<string>('');

//     function handleDisplayclick(displayMode: string) {
//         setDisplay(displayMode);
//     };


//     function handleSearch(value: string) {

//         const title = value.toLowerCase();
//         let result = [...data];

//         if (title.length > 0) {
//             result = [...data].filter(offer =>
//                 offer.location.toLowerCase().includes(title))
//         }
//         setCards(result);
//         setSearch(value);
//     }

//     return (
//         <>
//          <Title
//     main="BUSINESS CARD APP"
//     sub="Here you will find business cards"
// />

//             {

//                 cards.map(card =>
//                     <div key={card._id}>
//                         <div className="mb-5 shadow-lg p-3 mb-5 bg-body rounded">
//                             <div className="col">
//                                 <div className="card h-25">
//                                     <img src={card.image.url} className="card-img-top" alt={card.image.alt} />
//                                     <div className="card-body">
//                                         <h5 className="card-title">{card.title}</h5>
//                                         <p className="card-text">{card.subTitle}</p>
//                                         <p className="card-text">{card.address}</p>
//                                         <p className="card-text">{card.phone}</p>
//                                         <p className="card-text">{card.bizNumber}</p>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }




//         </>
//     );
// }


// const data:any = [<AllCardsList/>];

export interface Props {
    title: string,
    category: string,
    address: string,
    phone: string,
    image: {
        url: string,
        alt: string
    },
    
    CategoryClick: Function;
};



function Home() {
    const [cards, setCards] = useState<Array<ICardData>>([]);
    const context = useContext(AppContext);
    const navigate = useNavigate();
    const isLoggedIn = context !== null && context.userName.length > 0;



    const data = cards;
    const [display, setDisplay] = useState('grid');
    const [selectedCategory, setSelectedCategory] = useState(Categories.all);
    const [filtered, setFiltered] = useState([...data]);
    const [search, setSearch] = useState('');

    function filterByCategory(category: Categories, cards: Array<ICardData>):
        Array<ICardData> {
        if (category === Categories.all) {
            return cards;
        }
        return cards.filter(card => card.category === category);
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value as Categories;
        categoryChange(value);

    }
    function categoryChange(value: Categories) {
        const filteredData = filterByCategory(value, [...data]);
        setSelectedCategory(value);
        setSearch('');
        setFiltered(filteredData);
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        let result = [...data];
        if (value.length > 0) {
            const stripVal = value.trim().toLowerCase();
            result = [...data].filter(card =>
                card.category.toLowerCase().includes(stripVal)
            )
        }
        setSelectedCategory(Categories.all);
        setSearch(value);
        setFiltered(result);
    }

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
                setFiltered(json)
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
                // swal({
                //     icon: "success",
                // });
                navigate('/myFavorCards');
                toast.error('Something wrong! Try again', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }

    return (
        <>
            <Title
                main="Beauty and Health"
                sub="Take care of yourself"
            />
            {
                isLoggedIn &&
                <ButtonBars
                    updateDisplay={setDisplay}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    search={search}
                    handleSearch={handleSearch}
                />
            }

            <div className={`${display} p-5 `} >
                {
                    filtered.length === 0 ? (
                        <>
                            <h2 className="text-danger text-center">
                                Sorry! No Content
                            </h2>
                        </>
                    ) : (

                        isLoggedIn &&
                        filtered.map(card =>
                            <div key={card._id}>
                                <div className="pb-5 container-fluid ">
                                    <div className="col p-5 d-flex justify-content-center  ">
                                        <div className="card h-100 shadow-lg p-3 mb-5 bg-body rounded">
                                            <img src={card.image.url} className=" card-img-top zise" alt={card.image.alt} />
                                            <div className="card-body">
                                                {/* <div className="badge text-bg-info"
                                                onClick={(e) => CategoryClick(title)}
                                            >{title}</div> */}
                                                <h5 className="card-title"><span className="text-success text-uppercase">Name: </span>{card.title}</h5>
                                                {/* <p className="card-text"><span className="text-success text-uppercase">Description: </span>{card.subTitle}</p>
                                                <p className="card-text"><span className="text-success text-uppercase">Ingredients: </span>{card.address}</p>
                                                <p className="card-text"><span className="text-success text-uppercase">Price: </span>{card.phone}</p> */}
                                                {/* <p className="card-text">{category}</p> */}
                                                <p className="card-text"><span className="text-success text-uppercase">Category: </span>{card.category}</p>
                                            </div>
                                            {
                                                isLoggedIn &&
                                                <>
                                                    <div className="card-footer">
                                                        <Link
                                                            onClick={() => moveTo(card)}
                                                            to={`/myFavorCards`}
                                                            className="btn btn-default text-primary"
                                                        >
                                                            <i className="bi bi-person-lines-fill"> add to favourite list</i>
                                                        </Link><Link
                                                            to={`/oneCard/${card._id}`}
                                                            className="btn btn-default text-primary"
                                                        >
                                                            <i className="bi bi-folder2-open"> more info</i>
                                                        </Link></div></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                {
                    !isLoggedIn &&
                   <Entarence />                   
                }
                    </div>

        </>
            );
}

            export default Home;








            // cards.map(card =>
                    //     <AllCardsList
                    //         key={card._id}
                    //         {...card}
                    //         CategoryClick={categoryChange}

                    //     />
                    // ) 





                    // cards.map(card =>
                    //     <div key={card._id}>
                    //       <div className=" pb-5 ">
                    //             <div className="col p-5 d-flex justify-content-center  ">
                    //                 <div className="card   shadow-lg p-3 mb-5 bg-body rounded">
                    //                     <img src={card.image.url} className=" card-img-top" alt={card.image.alt} />
                    //                     <div className="card-body">
                    //                         {/* <div className="badge text-bg-info"
                    //                             onClick={(e) => CategoryClick(title)}
                    //                         >{title}</div> */}
                    //                         <h5 className="card-title">{card.title}</h5>
                    //                         <p className="card-text">{card.subTitle}</p>
                    //                         <p className="card-text">{card.address}</p>
                    //                         <p className="card-text">{card.phone}</p>
                    //                         {/* <p className="card-text">{category}</p> */}
                    //                     </div>
                    //                     {

                    //                         isLoggedIn &&
                    //                         <Link

                    //                             onClick={() => moveTo(card)}
                    //                             to={`/myFavorCards`}

                    //                         >

                    //                             <i className="bi bi-cloud-upload-fill"></i>
                    //                         </Link>
                    //                     }
                    //                 </div>
                    //             </div>
                    //         </div>

                    //     </div>
                    // )