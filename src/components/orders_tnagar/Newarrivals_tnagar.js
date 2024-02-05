import React, {useEffect}  from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { deleteProduct } from "../../Redux/Actions/ProductActions";
import { addToCart, addToCartTnagar, removefromcart } from "../../Redux/Actions/cartActions";
import { useState } from "react";
import { listProductDetails } from "../../Redux/Actions/ProductActions";
import { deleteProducttnagar, listNewarrivalsDetailstnagar, listProductDetailstnagar } from "../../Redux/Actions/ProductActionst";

const Newarrivals_tnagar = (props) => {
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
  useEffect(()=>
  {
    dispatch(listNewarrivalsDetailstnagar(product._id));
  }, [dispatch,product.id]);


  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteProducttnagar(id));
    }
  };
 
{/*}
  useEffect(() => {
    if (product._id) {
      

      dispatch(addToCart(product._id, 1));
    }
  }, [dispatch, product.id, 1]); */}
  



 

  return (
    <>
    
  
    <table className="table">
      <thead>
        <tr>
          <th style={{ width: "20%" }} scope="col">Name</th>
          <th style={{ width: "10%" }} scope="col">Product Code</th>
          

          <th style={{ width: "10%" }}scope="col">Size</th>
          <th style={{ width: "5%" }}scope="col">Stock</th>
          <th style={{ width: "10%" }} scope="col">Quantity</th>
          <th style={{ width: "5%" }} scope="col">Price</th>
          

          
          <th style={{ width: "10%" }} scope="col">Availability</th>

        
          {userInfo && userInfo.isOwner !== false && (
              <>
            <th style={{ width: "10%" }} scope="col">Edit</th>
            <th style={{ width: "10%" }} scope="col">Delete</th>
            </>
          )}
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
        <td>{product.product_code}</td>
        <td>{product.size} </td>
        <td>{product.countInStock}</td>

        <td>{product.price}</td>






        <td>{product.isavailability}</td>
        {userInfo && userInfo.isOwner === true &&
        (
        <>
        <td>
            
              <Link
                to={`/newarrivalst/${product._id}/edit`}
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

export default Newarrivals_tnagar;
