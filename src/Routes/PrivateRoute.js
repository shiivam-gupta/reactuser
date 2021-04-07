import { React } from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../Layouts/Navbar";

// const PrivateRoute = ({ component: Component, ...rest }) => {
const PrivateRoute = ({ component: Component }) => {
    const token = localStorage.getItem("token");
    return token ?
        // (<Route {...rest} render={(props) => <><Navbar /><Component {...rest} {...props} /></>} />) : 
        (<Route>
            <Navbar></Navbar>
            <Component />
        </Route>) :
        (<Redirect to="/login" />);

}

export default PrivateRoute;