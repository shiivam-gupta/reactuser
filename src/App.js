import { React, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
//import './mdbpro.min.css';
//import './all.css';
// import './bootstrap.min.css';
import './custom.css';
import Navbar from "./Layouts/Navbar.js";
import Aboutus from "./Pages/Aboutus.js";
import Contactus from "./Pages/Contactus.js";
import Home from "./Pages/Home.js";
import Users from "./Pages/Users/List.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notfound from "./Pages/Notfound.js";
import AddUser from "./Pages/Users/AddUser";
import EditUser from "./Pages/Users/EditUser";
import ViewUser from "./Pages/Users/ViewUser";
import Login from "./Pages/Auth/Login";
import Logout from "./Pages/Auth/Logout";
import Signup from "./Pages/Auth/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import Product from "./Pages/Products/Product";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        {/* <Navbar token={loggedIn}></Navbar> */}
        <Switch>
         
          <PrivateRoute exact path="/" component={Home}></PrivateRoute>
          <PrivateRoute exact path="/about-us" component={Aboutus}></PrivateRoute>
          <PrivateRoute exact path="/contact-us" component={Contactus}></PrivateRoute>
          <PrivateRoute exact path="/users" component={Users}></PrivateRoute>
          <PrivateRoute exact path="/product-list" component={Product}></PrivateRoute>
          <PrivateRoute exact path="/add-user" component={AddUser}></PrivateRoute>
          <PrivateRoute exact path="/edit-user/:id" component={EditUser}></PrivateRoute>
          <PrivateRoute exact path="/view-user/:id" component={ViewUser}></PrivateRoute>
          <PrivateRoute exact path="/log-out" component={Logout}></PrivateRoute>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/sign-up" component={Signup}></Route>
          <Route component={Notfound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
