import axios from "axios";
import { React,useState,useEffect } from "react";
import { useParams, Link} from "react-router-dom";


const ViewUser = () => {
    const [user,setUser] = useState({
        name : "",
        email : "",
        phone : "",
        website : ""
    });
    const {name,email,phone,website} = user;
    const {id} = useParams([]);

    useEffect(() =>{
        loadUserData()
    },[])

    const loadUserData = async() => {
        const result = await axios.get(`http://localhost:3002/user/${id}`);
        setUser(result.data)
    }

    return (
        <div className="container">
            <h2>Edit User </h2>
            
            <form>
                <div className="form-group">
                    <label for="exampleInputName">Name : {name}</label>
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail">Email : {email}</label>
                </div>
                <div className="form-group">
                    <label for="exampleInputPhone">Phone : {phone}</label>
                </div>
                <div className="form-group">
                    <label for="exampleInputWebsite">Website : {website}</label>
                </div>
                
                <Link className = "btn btn-primary" exact to="/users">Back</Link>
                
            </form>
        </div>
    );
}
export default ViewUser;