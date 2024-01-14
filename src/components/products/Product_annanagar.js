import React, {useEffect}  from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";
import { addToCart, removefromcart } from "../../Redux/Actions/cartActions";
import { useState } from "react";
import { listProductDetails } from "../../Redux/Actions/ProductActions";
import { deleteProducttnagar, listProductDetailstnagar } from "../../Redux/Actions/ProductActionst";
import { deleteProductannanagar, listProductDetailsannanagar } from "../../Redux/Actions/ProductActionsanna";
const Product_annanagar = (props) => {
  const { product } = props;
 
  let history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  console.log(userInfo.isOwner);
  //const [qty, setQty] = useState(1);
  //const cart = useSelector((state) => state.cart);
  //const { cartItems,success,error } = cart;
  //
const [qty, setQty] = useState(1);
  //const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const AddToCartHandle = (e) => {
    //const history = useHistory();
    e.preventDefault();
   
    history.push(`/carta/${product._id}?qty=${qty}`);
    
  };

{/*}
  useEffect(() => {
    if (product._id) {
      

      dispatch(addToCart(product._id, 1));
    }
  }, [dispatch, product.id, 1]); */}
  
  useEffect(()=>
  {
    dispatch(listProductDetailsannanagar(product._id));
  }, [dispatch,product.id]);


  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProductannanagar(id));
    }
  };
 

  return (
    <>
    
  
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "30%" }} scope="col">Name</th>
          <th style={{ width: "5%" }} scope="col">Price</th>
          <th style={{ width: "5" }}scope="col">Count</th>
          <th style={{ width: "5%" }}scope="col">Height</th>
          <th style={{ width: "5%" }} scope="col">width</th>
          <th style={{ width: "10%" }} scope="col">Quantity</th>
          <th style={{ width: "10%" }} scope="col">Branch</th>
          <th style={{ width: "10%" }} scope="col" className="">
            Add to Cart
          </th>
        
          
            {userInfo && userInfo.isOwner !== false && (
              <>
            <th style={{ width: "10%" }} scope="col">Edit</th>
            <th style={{ width: "10%" }} scope="col">Delete</th>
            </>
          )}
        
        </tr>
      </thead>
      
      <tbody>

        <td>
            <b>{product.name}</b>
        </td>
        <td>{product.price}</td>
        <td>{product.countInStock}</td>
        <td>{product.height}</td>
        <td>{product.width}</td>


        <td>
          {product.countInStock > -1 ? 
          (
          <>
                          
                            
            <select value={qty} onChange={(e) => setQty(e.target.value)}>
              {[...Array(product.countInStock).keys()].map(
                (x) => (
                <option key={x+1} value={x+1}>{x + 1}
                </option>
                                )
              )}
            </select>
                         
          </>
          ) : null}
        </td>
        <td>{product.branch}</td>
        <td>
              {product.countInStock > 0 ? 
              (
                
                  <Link
                    to="#"
                    onClick={AddToCartHandle}
                    className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                  >
                    <i class="fa fa-cart-plus" aria-hidden="true"></i>
                  </Link>
                
              ) : null}
                      
        </td>
        {userInfo && userInfo.isOwner === true &&
        (
        <>
        <td>
            
              <Link
                to={`/productanna/${product._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
            
        </td>
        <td>
              <Link
                to="#"
                onClick={() => deletehandler(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
        </td>
        </>
        )}
      

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/order`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  

    </>
  
  );
};

export default Product_annanagar;
