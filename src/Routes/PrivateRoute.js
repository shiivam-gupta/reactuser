import { React } from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../Layouts/Navbar";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");
    return token ? (<Route {...rest} render={(props) => <><Navbar /><Component {...rest} {...props} /></>} />) : (<Redirect to="/login" />);

}

export default PrivateRoute;