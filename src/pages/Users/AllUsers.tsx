import { toast } from "react-toastify";
import { deleteRequest, getRequest } from "../../services/apiService";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import Title from "../../components/Title";
import { ISignupData } from "../../Auth/Signup";
import { json } from "stream/consumers";

function AllUsers() {
    // const { id } = useParams();
    const [users, setUsers] = useState<Array<ISignupData>>([]);
    // const context = useContext(AppContext);

    function getUsers() {
        // const currentId = context?.userName;
        const res = getRequest(`users`);
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

                setUsers(json);
            })
    }

    useEffect(getUsers, []);

    // function deleteUser(userDel: ISignupData) {
    //     const updated = users.filter(user => user._id !== userDel._id);
    //     setUsers(updated);
    //     setUserDeleted(userDel);
    //   }
    function deleteUser(user: ISignupData) {

        const res = deleteRequest(
            `users/delUser/${user._id}`
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                console.log(json.id)
                const updated = [...users].filter(cardItem =>
                    cardItem._id !== user._id

                );
                setUsers(updated)
            })

    }




    // function delCard(card: ICardData) {

    //     const res = deleteRequest(
    //         `cards/${card._id}`,
    //     );
    //     if (!res) return;

    //     res.then(response => response.json())
    //         .then(json => {
    //             const updated = [...cards].filter(cardItem =>
    //                 cardItem._id !== card._id

    //             );
    //             setCards(updated)
    //         })
    // }


    return (
        <>


            <Title
                main="All Users"
                sub="Here you will find all users"
            />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0"></div>
                            <div className="bg-light m-4">


                                {/* <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="w-5">Name</th>
                                            <th className="w-5">Email</th>
                                           
                                            <th className="w-5">isBiz</th>
                                            <th className="w-5">isAdmin</th>
                                            <th className="w-5">favCads</th>
                                            <th className="w-5"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <td>main Table row 1 column 1</td>
                                        <td>main Table column 2
                                            <table >
                                                <tr>
                                                    <td>inner Table row 1 column 1</td>
                                                    <td>inner Table row 1 column 2</td>
                                                </tr>
                                                <tr>
                                                    <td>inner Table row 2 column 1 </td>
                                                    <td>inner Table row 2 column 2</td>
                                                </tr>
                                                <tr>
                                                    <td>inner Table row 3 column 1 </td>
                                                    <td>inner Table row 3 column 2</td>
                                                </tr>
                                            </table>
                                        </td>
                                  
                                    <tr>
                                        <td> main Table row 2 column 1 </td>
                                        <td> main Table row 2 column 2 </td>
                                    </tr>
                                    </tbody>
                            </table> */}




                            {
                                users.length === 0 ?
                                    <div className="text-danger">
                                        Error: no offers are available
                                    </div>
                                    : (
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="w-5">Name</th>
                                                    <th className="w-5">Email</th>
                                                    {/* <th className="w-5">ID</th> */}
                                                    <th className="w-5">isBiz</th>
                                                    <th className="w-5">isAdmin</th>
                                                    <th className="w-5">
                                                        favCads</th>
                                                    <th className="w-5"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((user: ISignupData) =>
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.isBiz?.toString()}</td>
                                                            <td>{user.isAdmin?.toString()}</td>
                                                            <td className="vvv">
                                                                {user.favCards.length}
                                                                {/* {
                                                                    user.favCards.forEach((card: any) => {
                                                                        // <tr>
                                                                        <td> {card}</td>
                                                                        console.log(card)
                                                                        // </tr>
                                                                    })
                                                                    } */}





                                                            </td>
                                                            {/* 
                                                                <td>
                                                                    <table>
                                                                        <td>
                                                                        <td>{user.favCards}</td>
                                                                        </td>
                                                                       
                                                                    </table>
                                                                </td> */}












                                                            {/* {
                                                            users.map((user:ISignupData) => 
                                                            <tr key={user._id}>
                                                                <td>{user.favCards}</td>
                                                                </tr>
                                                            )} */}
                                                            <div>
                                                                <div className="d-flex justify-content-end">
                                                                    <button
                                                                        onClick={() => deleteUser(user)}
                                                                        className="btn btn ">

                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                    <Link

                                                                        to={`/ShowUser/${user._id}`}
                                                                        className="btn btn-default text-primary"
                                                                    >

                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </Link>
                                                                    {/* <Link

                                                                        to={`/arrayOfFavCards/${user._id}`}
                                                                        className="btn btn-default text-primary"
                                                                    >

                                                                        <i className="bi bi-pencil-square"></i>
                                                                    </Link> */}
                                                                </div>
                                                            </div>



                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
        </>
    );
}

export default AllUsers;