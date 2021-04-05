import axios from "axios";
import { React,useEffect, useState } from "react";
import { Link, Redirect} from "react-router-dom";

const Home = () => {
    const token = localStorage.getItem('token');

    const [Product,setProduct] = useState([]);

    useEffect(()=>{
        loadProducts();
    },[]);

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:3002/product");
        setProduct(result.data.reverse())
    }

    return(token ? 
        <div className ="container">
            <h1>
                Demo React Project
            </h1>
            <div className="row">
                {
                    Product.slice(0, 4).map((item, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                            <div className="card py-2 text-center">
                                <div className="card-body">
                                    <img src={process.env.PUBLIC_URL + 'Assets/'+item.image} height="10px" alt={item.title} className="img-fluid w-50 mx-auto rounded-circle"/>
                                    <h5>{item.title}</h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button className="btn btn-primary">Add To Cart</button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-danger">Add To Fav</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <div classNames="row">
                <Link to="/product-list">View All </Link>
            </div>
        </div> : <Redirect to="/login"></Redirect>
    );

}
export default Home;