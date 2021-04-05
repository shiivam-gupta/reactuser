import axios from "axios";
import { React, useEffect, useState } from "react";

const Product =() => {

    const [Product,setProduct] = useState([]);
    const [Category,setCategory] = useState([]);
    const [Ingredients,setIngredients] = useState([]);
    const [filterParam,setFilterParam] = useState([]);

    useEffect(() => {
        loadProduct('');
        loadCategory();
        loadIngredients();
    },[]);

    const loadProduct = async (category) => {
        var productList = [];
        if(category) {
            console.log(category)
            if(category.length > 0){
                //const productList = [];
                category.map(async (item,index) => {
                    const product = await axios.get('http://localhost:3002/product?category_like='+item);
                    productList.push(product);
                });  
            }
        } else {
            productList = await axios.get('http://localhost:3002/product');
        }

        
         console.log(productList);
         setProduct(productList.data)
    } 

    const loadCategory = async () => {
        const categoryList = await axios.get('http://localhost:3002/category');

        categoryList.data.forEach(async (item,index)=> {
            const productCat = await axios.get('http://localhost:3002/product?category_like='+item.title);
            categoryList.data[index]['productCount'] = productCat.data.length;
            categoryList.data[index]['checked'] = false;
            if((index+1) === categoryList.data.length) {
                CatCallback(categoryList);
            }
        })
    }

    const loadIngredients = async () => {
        const ingredientsList = await axios.get('http://localhost:3002/ingredients');

        ingredientsList.data.forEach(async (item,index)=> {

            ingredientsList.data[index]['checked'] = false;
            if((index+1) === ingredientsList.data.length) {
                IndiCallback(ingredientsList);
            }
        }) 
    }

    const CatCallback = (categoryList) => {
        setCategory(categoryList.data);
    }

    const IndiCallback = (ingredientsList) => {
        setIngredients(ingredientsList.data);
    }

    const selectCategory = (e,id) => {
        if(e.target.checked){
            Category.forEach(async (item,index)=> {
                if(item.id == id){
                    Category[index]['checked'] = true
                }
            })
            setFilterParam(filterParam => [...filterParam, "cat_"+e.target.value]);
        } else {
            Category.forEach(async (item,index)=> {
                if(item.id == id){
                    Category[index]['checked'] = false
                }
            })
            setFilterParam(filterParam.filter(item => item !== "cat_"+e.target.value));
        }
        setCategory(Category);
        
        if(filterParam.length > 0){
            loadProduct(filterParam);
        }
        
    }

    const selectIngredients = (e,id) => {
        if(e.target.checked){
            Ingredients.forEach(async (item,index)=> {
                if(item.id == id){
                    Ingredients[index]['checked'] = true
                }
            })

            setFilterParam(filterParam => [...filterParam, "indi_"+e.target.value]);
        } else {
            Ingredients.forEach(async (item,index)=> {
                if(item.id == id){
                    Ingredients[index]['checked'] = false
                }
            })
            setFilterParam(filterParam.filter(item => item !== "indi_"+e.target.value));
        }
        setIngredients(Ingredients);
    }

    const removeFilter = (value) =>{

        Category.forEach(async (item,index)=> {
            if("cat_"+item.title == value){
                Category[index]['checked'] = false
            }
        })
        setCategory(Category);

        Ingredients.forEach(async (item,index)=> {
            if("indi_"+item.title == value){
                Ingredients[index]['checked'] = false
            }
        })
        setIngredients(Ingredients);
        setFilterParam(filterParam.filter(item => item !== value));
    }

    return(<div>
            <div className="wrapper">
                <div className="d-md-flex align-items-md-center">
                    <div className="h3">Product List</div>
                    <div className="ml-auto d-flex align-items-center views"> 
                        {/* <span className="btn text-success"> 
                            <span className="fas fa-th px-md-2 px-1"></span>
                            <span>Grid view</span> 
                        </span> 
                        <span className="btn"> 
                            <span className="fas fa-list-ul"></span>
                            <span className="px-md-2 px-1">List view</span>
                        </span>  */}
                        <span className="green-label px-md-2 px-1">{Product.length}</span> 
                        <span className="text-muted">Products</span> 
                    </div>
                </div>
                
                <div className="d-lg-flex align-items-lg-center pt-2">
                    <div className="text-muted filter-label">Sort:</div>
                    <div className="form-inline d-flex align-items-center my-2 mr-lg-2 radio bg-light border">  
                        <label className="options">A to Z 
                            <input type="radio" name="productSort" value="sort_atoz"/> 
                            <span className="checkmark"></span> 
                        </label> 
                        <label className="options">Z to A 
                            <input type="radio" name="productSort" value="sort_ztoa"/> 
                            <span className="checkmark"></span> 
                        </label>     
                        <label className="options">Most Popular 
                            <input type="radio" name="productSort" value="sort_popular"/> 
                            <span className="checkmark"></span> 
                        </label> 
                        <label className="options">Cheapest 
                            <input type="radio" name="productSort" value="sort_cheap"/> 
                            <span className="checkmark"></span> 
                        </label> 
                    </div>
                    
                    {/* <div className="form-inline d-flex align-items-center my-2 checkbox bg-light border mx-lg-2"> 
                        <select name="product_sort" id="country" className="bg-light">
                            <option value="" hidden>Sort</option>
                            <option value="India">A to Z</option>
                            <option value="USA">Z to A</option>
                        </select> 
                    </div> */}
                </div>
                <div className="d-sm-flex align-items-sm-center pt-2 clear">
                    <div className="text-muted filter-label">Applied Filters:</div>
                    {
                        filterParam.map((filterVal,index) => (
                            <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0 my-sm-0 my-2">{filterVal.replace(/cat_|indi_/, "")}
                                <span className=" px-1 close" onClick={(e) => removeFilter(filterVal)}>&times;</span> 
                            </div>
                        ))
                    }
                    
                    {/* <div className="green-label font-weight-bold p-0 px-1 mx-sm-1 mx-0">Selected Filtre         
                        <span className=" px-1 close">&times;</span> 
                    </div> */}
                </div>
                <div className="filters"> <button className="btn btn-success" type="button" data-toggle="collapse" data-target="#mobile-filter" aria-expanded="true" aria-controls="mobile-filter">Filter<span className="px-1 fas fa-filter"></span></button> </div>
                <div className="content py-md-0 py-3">
                    <section id="sidebar">
                        <div className="py-3">
                            <h5 className="font-weight-bold">Categories</h5>
                            <form className="brand">
                                {
                                    Category.map((catItem,index) =>(
                                        
                                        <div className="form-inline d-flex align-items-center py-1"> 
                                            <label className="tick">{catItem.title} <span className="badge badge-primary badge-pill">{catItem.productCount}</span> <input type="checkbox" value={catItem.title} className="categoryitem" onChange={(e) => selectCategory(e,catItem.id)} checked={catItem.checked}/> <span className="check"></span></label>
                                        </div>
                                    ))
                                }
                            </form>
                        </div>
                        <div className="py-3">
                            <h5 className="font-weight-bold">Ingredients</h5>
                            <form className="brand">
                                {
                                    Ingredients.map((indiItem,index) => (
                                        <div className="form-inline d-flex align-items-center py-1"> <label className="tick">{indiItem.title} <input type="checkbox" value={indiItem.title} onChange={(e) => selectIngredients(e,indiItem.id)} checked={indiItem.checked}/> <span className="check"></span> </label> </div>
                                    ))
                                }
                            </form>
                        </div>
                    </section>
                    <section id="products">
                        <div className="container py-3">
                            <div className="row">
                                {
                                    Product.map((prodItem,index) => (
                                        <div className="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 mb-4">
                                            <div className="card"> 
                                                <img className="card-img-top" src={process.env.PUBLIC_URL + 'Assets/'+prodItem.image}></img>
                                                <div className="card-body">
                                                    <h6 className="font-weight-bold pt-1">{prodItem.title}</h6>
                                                    <div className="text-muted description">{prodItem.description}</div>
                                                    {/* <div className="d-flex align-items-center product"> 
                                                        <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="fas fa-star"></span> <span className="far fa-star"></span> 
                                                    </div> */}
                                                    <div className="d-flex align-items-center justify-content-between pt-3">
                                                        <div className="d-flex flex-column">
                                                            <div className="h6 font-weight-bold">{prodItem.discounted_price} USD</div>
                                                            <div className="text-muted rebate">{prodItem.price}</div>
                                                        </div>
                                                        <div className="btn btn-primary">Buy now</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default Product;