import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";

import { useDispatch, useSelector } from "react-redux";
import { listProducts, } from "../../Redux/Actions/ProductActions";
import { listProductsannanagar } from "../../Redux/Actions/ProductActionsanna";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "./pagination";
import { listProductstnagar } from "../../Redux/Actions/ProductActionst";
import Product_tnagar from "./Product_tnagar";
import Product_annanagar from "./Product_annanagar";
const MainProducts = (props) => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const {keyword: propKeyword,pagenumber}=props;
  const [keyword, setKeyword] = useState(propKeyword );
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  //const { loading, error, products } = productList;
 // console.log(userInfo.branch)
  let history = useHistory();
  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  //const filteredProducts =products.filter((product) => product.branch === "tnagar");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
    //  history.push(`/search/${keyword}`);
      history.push(`/products/${keyword}`);
    } else {
      history.push("/");
    }
  };
  useEffect(() => {
    dispatch(listProducts(keyword,pagenumber));
      //dispatch(listProductstnagar(keyword,pagenumber));

  }, [dispatch, keyword,pagenumber, successDelete]);
 /*
  useEffect(()=>{
    dispatch(listProduct(keyword,pagenumber));

  },[dispatch,keyword,pagenumber]);
/*
useEffect(() => {
  dispatch(listProducts());
}, [dispatch, successDelete]);
*/
return (
  
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
      {/*}
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothings</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </header>
        
      */}
              <header className="card-header">
          <div className="row gx-3">
            <form className="col-lg-4 col-md-6 me-auto" onSubmit={submitHandler}>
  
              <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
              onChange={(e) => setKeyword(e.target.value)}
            />
 
            </form>
          </div>
        </header>
        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {products.map((product) => (
                <Product product={product} key={product._id} />
              ))}

            </div>

          )}
                    <nav className="float-end mt-4" aria-label="Page navigation">
                      {/* Pagination */}
                      <Pagination
                      pages={pages}
                      page={page}
                      keyword={keyword ? keyword : ""} //
                    />
                    </nav>

          
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
/*          <nav className="float-end mt-4" aria-label="Page navigation">
 //                     {/* Pagination */
   //                   <Pagination
     //             pages={pages}
       //           page={page}
                  
         //       />
       //         </nav>