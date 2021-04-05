import axios from "axios";
import { React,useState } from "react";
import { useHistory,Link } from "react-router-dom";


const AddUser = () => {
    const [user,setUser] = useState({
        name : "",
        email : "",
        phone : "",
        website : ""
    });

    const {name,email,phone,website} = user;
    const onInputChange = (e) => {
        setUser({...user,[e.target.name] : e.target.value})
        //console.log(user);
    }

    const history = useHistory([]);

    const formSubmit = async (e) => {
        e.preventDefault();
        const result =  await axios.post('http://localhost:3002/user',user);
        history.push("/users");
    }

    return (
        <div className="container">
            <h2>Add User </h2>
            <form onSubmit = { e => formSubmit(e)}>
                <div className="form-group">
                    <label for="exampleInputName">Name</label>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name" name="name" value={name} 
                    onChange={e => onInputChange(e)} /> 
                    
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail" placeholder="Enter Email" name="email" value={email} onChange={e => onInputChange(e)}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPhone">Phone</label>
                    <input type="text" className="form-control" id="exampleInputPhone" placeholder="Enter Phoone" name="phone" value={phone} onChange={e => onInputChange(e)}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputWebsite">Website</label>
                    <input type="text" className="form-control" id="exampleInputWebsite" placeholder="Enter Website" name="website" value={website} onChange={e => onInputChange(e)}/>
                </div>
                <button type="submit" className="btn btn-primary mr-2">Submit</button>
                
                <Link className = "btn btn-primary" exact to="/users">Back</Link>
               
                </form>
        </div>
    );
}
export default AddUser;