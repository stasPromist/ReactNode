import { toast } from "react-toastify";
import { deleteRequest, getRequest } from "../../services/apiService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import { ISignupData } from "../Auth/Signup";
import './AllUsers.css';

function AllUsers() {
    const [users, setUsers] = useState<Array<ISignupData>>([]);

    //Get all users
    function getUsers() {
        const res = getRequest(`users`);
        if (!res) return;
        res.then(response => response.json())
            .then(json => {
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
    
    //Delete user
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
                toast.info('Successfully deleted', {
                    position: toast.POSITION.TOP_CENTER
                });
                setUsers(updated)
            })
    }

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
                                {
                                    users.length === 0 ?
                                        <div className="text-danger">
                                            No users
                                        </div>
                                        : (
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="w-5">Photo</th>
                                                        <th className="w-5">Name</th>
                                                        <th className="w-5">Email</th>
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
                                                                <td className=""> <img src={user.image.url}
                                                                    className="figure-img img-fluid rounded-circle photosize " alt={user.image.alt} /></td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>{user.isBiz?.toString()}</td>
                                                                <td>{user.isAdmin?.toString()}</td>
                                                                <td className="vvv">
                                                                    {user.favCards.length}
                                                                </td>
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