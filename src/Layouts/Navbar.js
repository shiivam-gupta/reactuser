import { React,Fragment,useState } from "react";
import { Link,NavLink } from "react-router-dom";

const Navbar = (data) => {
  //const {token} = data
  //console.log('token==='+token);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const LoggedInMenu = () => {
    return (<Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" exact aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact aria-current="page" to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact aria-current="page" to="/product-list">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/about-us">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/contact-us">Contact Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/log-out">Log Out</NavLink>
              </li>
            </Fragment>)
  }

  const NotLoggedInMenu = () => {
    return (<Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/sign-up">Sign Up</NavLink>
              </li>
            </Fragment>)
  }

  const Menu = () => {
    if(token){
      return(<LoggedInMenu/>)
    } else {
      return(<NotLoggedInMenu/>)
    }

  }
  
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">React</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Menu/>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;