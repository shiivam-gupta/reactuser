import { React } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {

    const history = useHistory([]);
    localStorage.removeItem('token');
    history.push('login')
    return (<div></div>);
}

export default Logout;