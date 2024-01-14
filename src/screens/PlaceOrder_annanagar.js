import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listUser } from "../Redux/Actions/userActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
//import { createOrder, updateProductCounts } from "../Redux/Actions/OrderActions";


import { editProduct, updateProduct } from "../Redux/Actions/ProductActions";
import { editCustomer } from "../Redux/Actions/customerActions";
import { createOrder_tnagar } from "../Redux/Actions/OrderActions_tnagar";
import { createOrder_annanagar,updateProductCounts } from "../Redux/Actions/OrderActions_annanagar";


const PlaceOrderScreen_annanagar = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
 const userList= useSelector((state)=>state.userList);
  
  const { users } = userList;

  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const[billedby, setBilledby]= useState("");

  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
 cart.shippingPrice = shipping;
 const total=cart.totalPrice-discount;
  cart.taxPrice = addDecimals(Number((0* cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  
  useEffect(() => {
    console.log("Component is mounting...");
    dispatch(listUser());
  }, [dispatch]);

  //const orderCreate = useSelector((state) => state.orderCreate);
const orderCreate = useSelector((state) => state.orderCreate)||{} ;

 // const { order, success, error } = orderCreate;

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orderanna/${order._id}`);
      
      dispatch({ type: ORDER_CREATE_RESET });
      
      

    }
   
  }, [history,dispatch,success,order]);
{/*
const placeOrderHandler = async (orderItems, dispatch) => {  
  try {
    for (const orderItem of orderItems) {
      const productId = orderItem.product;
      const editedProduct = await editProduct(productId);
      const updatedCount = editedProduct.countInStock - orderItem.qty;

      dispatch(updateProduct({
        productId,
        countInStock: updatedCount,
      }));

      console.log(`Product count updated for ${productId}: ${updatedCount}`);
    }
  } catch (error) {
    console.error('Error updating product counts:', error);
    throw new Error('Error updating product counts');
  }
}; */}

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    


      //updateproducthandler(e);
      // Call createOrder action
      dispatch(createOrder_annanagar({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: shipping,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        orderdiscount: discount,
        grandtotal:total,
        followedby:billedby,

      }));
   
      history.push(`/orderanna/${order._id}`);
     // dispatch({ type: ORDER_CREATE_RESET });
    //  history.push(`/order/${order._id}`);

      // Reset the cart and order creation status


  };
  const updateproducthandler =async(e)=>
  {
   
  }

{/**
  const placeOrderHandler = (e) => {
    //e.preventDefault();

    dispatch(

  
    
    createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice,
    }));
  

   
    
  };

*/}

  return (
    <>
    
      <Header />
      
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{cart.shippingAddress.name}</p>
                <p>{cart.shippingAddress.email}</p>
                <p>{cart.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                <p>Pay method: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>QUANTITY</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>₹{item.qty * item.price}</h6>
                    </div>



                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>₹{cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                  <strong>Shipping Charges</strong></td>
                  <td>
                      <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={shipping}
                          onChange={(e) => setShipping(e.target.value)}
                        />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>₹{cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                  <strong>Discount</strong></td>
                  <td>
                      <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>₹{cart.totalPrice-discount}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Billed by</strong>
                  </td>
                  <td>
                    {users && (
                      <select
                        className="form-control"
                        value={billedby}
                        onChange={(e) => setBilledby(e.target.value)}
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              //<button type="submit" onClick={placeOrderHandler}>
              <button type="submit" onClick={(e) => { placeOrderHandler(e);}}>
                PLACE ORDER
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default PlaceOrderScreen_annanagar;
