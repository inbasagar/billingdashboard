import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS
  } from "../Constants/ProductConstants";
  import Axios from "../axios.js";
  import { logout } from "./userActions";
  
  import axios from 'axios';  
  export const listProductstnagar = (keyword = " ",pageNumber=" ") => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/productst?pageNumber=${pageNumber}&keyword=${keyword}`, config);
  //?pageNumber=${pageNumber}
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const listorderedProductstnagar = (keyword = " ",pageNumber=" ") => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/productst/ordered?pageNumber=${pageNumber}&keyword=${keyword}`, config);
  //?pageNumber=${pageNumber}
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };
  {/** 
  export const listProducts_tnagar = (keyword = "",pageNumber="") => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/products/tnagar?pageNumber=${pageNumber}&keyword=${keyword}`, config);
  //?pageNumber=${pageNumber}
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  
  
  */}
  /*
  export const listProducts = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/products/all`, config);
  
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };
  */
  // DELETE PRODUCT
  export const deleteProducttnagar = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await Axios.delete(`/api/productst/${id}`, config);
  
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const createOrderedProducttnagar =
    (name, price, description, image, countInStock,height,width,isavailability,branch)=>
    async (dispatch, getState) => {
      try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await Axios.post(
          `/api/productst/order`,
          { name, price, description, image, countInStock,height,width,isavailability: "ordered",branch},
          config
        );
  
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch({
          type: PRODUCT_CREATE_FAIL,
          payload: message,
        });
      }
    };
  // CREATE PRODUCT
  export const createProducttnagar =
    (name, price, description, image, countInStock,height,width,isavailability,branch)=>
    async (dispatch, getState) => {
      try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await Axios.post(
          `/api/productst/`,
          { name, price, description, image, countInStock,height,width,isavailability,branch},
          config
        );
  
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch({
          type: PRODUCT_CREATE_FAIL,
          payload: message,
        });
      }
    };
  
  // EDIT PRODUCT
  export const editProducttnagar = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_EDIT_REQUEST });
      const { data } = await Axios.get(`/api/productst/${id}`);
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_EDIT_FAIL,
        payload: message,
      });
    }
  };
  
   
  export const updateProductCountstnagar = (
    productId,
    name,
    price,
    description,
    image,
    countInStock,
    height,
    width
  ) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
   
        const updatedProduct = {
          _id: productId,
          name,
          price,
          description,
          image,
          countInStock,
          height,
          width,
        };
        console.log("inside updateproductcount");
        console.log(countInStock,productId,name,price,description,);
        const { data } = await Axios.put(
          `/api/productst/${productId}`,
          updatedProduct,
          config
        );
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
        dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
      
  
  
  
  
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  
  
  {/*** ignore below 
  export const updateProductCounts = (orderItems) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      for (const orderItem of orderItems) {
        if (orderItem.product) {
          const productId = orderItem.product;
          const editedProduct = await editProduct(productId);
          const updatedCount = editedProduct.countInStock - orderItem.qty;
  
  
          dispatch(
            updateProductCounts({
              productId,
              name,
              price,
              description,
              image,
              countInStock:updatedCount,
              height,
              width,
            })
          );
          const { data } = await Axios.put(
            `/api/products/${productId}`,
            
            config
          );
          console.log(`Product count updated for ${productId}: ${updatedCount}`);
  
          dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
          dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
        } else {
          console.error('Product property is undefined in orderItem:', orderItem);
        }
      }
  
  
    } catch (error) {
      // Handle errors
      console.error('Error updating product counts:', error);
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: error.message || 'Error updating product counts',
      });
    }
  };
  
  */}
  {/**export const updateProductCounts  = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
  
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  */}
  // UPDATE PRODUCT
  export const updateProducttnagar = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.put(
        `/api/productst/${product._id}`,
        product,
        config
      );
  
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const listProductDetailstnagar = (id) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const { data } = await Axios.get(`/api/productst/${id}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  