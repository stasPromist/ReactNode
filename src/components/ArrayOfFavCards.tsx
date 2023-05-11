import { toast } from "react-toastify";
import { getRequest } from "../services/apiService";
import { useEffect, useState } from "react";
// import { ISignupData } from "../Auth/Signup";
import { useParams } from "react-router-dom";
import Title from "./Title";
import { ISignupData } from "../Auth/Signup";

function ArrayOfFavCards() {
    const [users, setUsers] = useState<Array<ISignupData>>([]);
    // const [favCards, setFavCards] = useState<[]>();
    const { id } = useParams();

 
  
    function getUsers() {
        // const currentId = context?.userName;
        const res = getRequest(`users/${id}`);
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
                // setFavCards(json)
                setUsers(json);
            })
    }

    useEffect(getUsers, []);
    return (
         <>
           <Title
                main="Update User"
                sub="you can update only rules ( isBiz: true or false )"
            />
             {
                                  
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        {
                                                    users.map((user: ISignupData) =>
                                                            <tr key={user._id}>
                                                                <td>{user.favCards} </td>
                                                                </tr>
                                                       
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                  



                                                              
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
                                                              



                                                           
                                                        
                                                    
                                                </tbody>
                                            </table>
}
                                
           
        </>
     );
}

export default ArrayOfFavCards;