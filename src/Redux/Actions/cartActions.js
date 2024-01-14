import Axios from "../axios.js";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../Constants/CartConstants";
import { updateProductCounts } from "./ProductActions.js";

// ADD TO CART
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${id}`);


  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      height: data.height,
      width: data.width,
    },
  });
  //const { products } = await Axios.get(`/api/products/${data._id}`);
  {/** 
  console.log(data._id);
  const productId=data._id;
  const updatedCount = data.countInStock - qty;
  dispatch(
    updateProductCounts(
      data._id,
      data.name,
      data.price,
      data.description,
      data.image,
      updatedCount,
      data.height,
      data.width
    )
  );
*/}
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToCartTnagar = (id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/productst/${id}`);


  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      height: data.height,
      width: data.width,
    },
  });


  
  //const { products } = await Axios.get(`/api/products/${data._id}`);
  {/** 
  console.log(data._id);
  const productId=data._id;
  const updatedCount = data.countInStock - qty;
  dispatch(
    updateProductCounts(
      data._id,
      data.name,
      data.price,
      data.description,
      data.image,
      updatedCount,
      data.height,
      data.width
    )
  );
*/}
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToCartAnnanagar = (id, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/productsanna/${id}`);


  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
      height: data.height,
      width: data.width,
    },
  });


  

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
// REMOVE PRODUCT FROM CART
export const removefromcart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
