import { React,useState } from "react";
import { Route,Redirect } from "react-router-dom";

const PrivateRoute = ({component : Component, ...rest}) => {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
    console.log(loggedIn);
    return loggedIn ? (<Route {...rest} render={(props) => <Component {...rest} {...props} />}/>) : (<Redirect to="/login"/>);

}

export default PrivateRoute;