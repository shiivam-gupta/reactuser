import { React, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
// import Pagination from "../../Layouts/Pagination";
import Pagination from '@material-ui/lab/Pagination';

const List = () => {

    const pageLimit = 5
    const [User, setUser] = useState([]);
    // const [showNumber, setShowNumber] = useState(false);
    // const history = useHistory([]);
    const [page, setPage] = useState(1);
    const [paging, setPaging] = useState({
        start: pageLimit * page - pageLimit,
        end: pageLimit * page
    })
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPaging({
            start: pageLimit * value - pageLimit,
            end: pageLimit * value
        })
        setPage(value);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // const loadPagination = (pageLimit, totalNumber, navigatePage) => {
    //     console.log("first===" + totalNumber);
    //     //setTimeout(function(){ 
    //     return (
    //         <Pagination pageLimit={pageLimit} totalPost={totalNumber} navigatePage={navigatePage} />
    //     )
    //     //}, 1000)

    // }

    const loadUsers = async (action = "") => {
        const result = await axios.get('http://localhost:3002/user');
        setUser(result.data.reverse());
        let CurrentPage = Math.ceil(result.data.length / pageLimit)
        if (CurrentPage < page) {
            setPage(CurrentPage)
            setPaging({
                start: pageLimit * CurrentPage - pageLimit,
                end: pageLimit * CurrentPage
            })
        }

        // if (action == "delete") {
        //     setShowNumber(true)

        //     console.log('seconnd==' + parseInt(User.length));
        //     console.log('seconnddd==' + parseInt(result.data.length));
        //     console.log('seconnd==' + showNumber);
        // } else {
        //     setShowNumber(false)
        // }

    }

    const searchUser = async (e) => {
        console.log(e.target.value);
        let searchWord = e.target.value;
        if (searchWord.length > 0) {
            const searchResults = await axios.get('http://localhost:3002/user?q=' + searchWord);
            setUser(searchResults.data.reverse());
        } else {
            loadUsers();
        }
    }

    const removeUser = async (id) => {
        await axios.delete(`http://localhost:3002/user/${id}`);
        const action = "delete";
        loadUsers();
        // navigatePage(1, 5)
        // history.push("/users");
        //loadUsers(action);
    }



    // const navigatePage = (start, end) => {
    //     setPaging({ start: start, end: end })
    // }

    // if (!this.state.response){
    //     return <div>Loading...</div>
    // }

    return (
        <div className="container">
            <h2>User List</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="pull-right">
                        <Link className="btn btn-primary" exact to="/add-user">Add User</Link>
                    </div>
                </div>
                <div className="col-md-3" >
                    <div className="input-group">
                        <div className="form-outline">
                            <input type="search" id="form1" className="form-control" placeholder="Search" onChange={(e) => searchUser(e)} />
                            {/* <label className="form-label" for="form1">Search</label> */}
                        </div>
                        {/* <button type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button> */}
                    </div>
                </div>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        User.slice(paging.start, paging.end).map((value, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>{value.phone}</td>
                                <td>
                                    <Link className="btn btn-primary mr-2" to={`/view-user/${value.id}`}>View</Link>
                                    <Link className="btn btn-outline-primary mr-2" to={`/edit-user/${value.id}`}>Edit</Link>
                                    <Link className="btn btn-danger" onClick={(e) => removeUser(value.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination count={Math.ceil(User.length / pageLimit)} page={page} onChange={handleChange} />

            {
                // loadPagination(pageLimit, parseInt(User.length), navigatePage)
                // (User.length > 0 ? loadPagination(pageLimit, parseInt(User.length), navigatePage) : <div> Loading ... </div>)
                // showNumber ? loadPagination(pageLimit,parseInt(User.length),navigatePage) : (User.length > 0 ?  loadPagination(pageLimit,parseInt(User.length),navigatePage) : <div> Loading ... </div> )
            }
        </div>
    );



}
export default List; 