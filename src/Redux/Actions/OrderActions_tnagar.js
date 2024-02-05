import {
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_MARK_DELIVERED_FAIL,
    ORDER_MARK_DELIVERED_REQUEST,
    ORDER_MARK_DELIVERED_SUCCESS,
    ORDER_MARK_PAID_FAIL,
    ORDER_MARK_PAID_REQUEST,
    ORDER_MARK_PAID_SUCCESS,
    ORDER_MARK_TOBETAKEN_REQUEST,
    ORDER_MARK_TOBETAKEN_SUCCESS,
    ORDER_MARK_TOBETAKEN_FAIL,

   
  } from "../Constants/OrderConstants";
  
  import { logout } from "./userActions";
  import Axios from "../axios.js";
  import { CART_CLEAR_ITEMS } from "../Constants/CartConstants.js";
  import { updateProduct, updateProductCounts } from "./ProductActions.js";
import { updateProductCountstnagar } from "./ProductActionst.js";
import { PRODUCT_EDIT_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants.js";
  
  
  
  const editProduct = async (productId) => {
    try {
      // Implement your logic to fetch the product data for editing
      const { data } = await Axios.get(`/api/productst/${productId}`);
  
      // Return the product data or any relevant information for editing
      return data;
    } catch (error) {
      // Handle errors during product editing
      console.error('Error editing product:', error);
      throw new Error('Error editing product');
    }
  };
  
  
  
  {/**const updateProductCounts = async (orderItems, dispatch) => {
    try {
      for (const orderItem of orderItems) {
        const productId = orderItem.product;
        const editedProduct = await editProduct(productId);
        if (editedProduct) {
          const updatedCount = editedProduct.countInStock - orderItem.qty;
          console.log(`updatedCount ${updatedCount}`);
          dispatch(updateProduct({
            productId,
            countInStock: updatedCount,
          }));
          console.log(`Product count updated for ${productId}: ${updatedCount}`);
        }else {
            console.error(`Edited product not found for ${productId}`);
          }
  
  
      }
    } catch (error) {
      console.error('Error updating product counts:', error);
      throw new Error('Error updating product counts');
    }
  };
  */}
  
  export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      //await updateProductCounts(order.orderItems, dispatch);
  
  
      
  
            // Perform any modifications to the edited product data if needed
  
            // Assuming product.quantity represents the quantity to be deducted
            //const updatedProduct = await updateProduct(product._id, {
          //    quantity: editedProduct.quantity - product.quantity,
          //  });
  
            // Return the updated product data
          //  return updatedProduct;
          
  
  
  
    
    const { data } = await Axios.post(`/api/orders`, order, config);
  
      
      // Update product counts for each item in the order before creating the order
    
      for (const orderItem of order.orderItems) {
        //  const updatedCount = orderItem.product.countInStock - orderItem.qty; **** correct
        const { product,qty} = orderItem;
        
          
          // Dispatch the action to update the product count
          //console.log(orderItem.product);
          //console.log(orderItem.product.name);
          //console.log(orderItem.product.price);
          //console.log(orderItem.product.description);
          //console.log(orderItem.product.countInStock );
          //console.log(orderItem.qty);
          const { data } = await Axios.get(`/api/productst/${orderItem.product}`);
          const updatedCount = data.countInStock - qty;
          console.log(orderItem.product);
          console.log(data.countInStock);
          console.log(qty);
          console.log(updatedCount);
          
    
  
          dispatch(
            updateProductCounts(
              orderItem.product, // Assuming _id is the unique identifier for the product
              data.name,
              data.price,
              data.description,
              data.image,
              updatedCount-1+1,
              data.height,
              data.width,
            )
          );
        }
       
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR_ITEMS, payload: data });

    
        localStorage.removeItem("cartItems");
        
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };

  export const createOrder_tnagar = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
   
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      //await updateProductCounts(order.orderItems, dispatch);
  
  
      
  
            // Perform any modifications to the edited product data if needed
  
            // Assuming product.quantity represents the quantity to be deducted
            //const updatedProduct = await updateProduct(product._id, {
          //    quantity: editedProduct.quantity - product.quantity,
          //  });
  
            // Return the updated product data
          //  return updatedProduct;
          
  
  
  
    
    const { data } = await Axios.post(`/api/orderst`, order, config);
  
  
      // Update product counts for each item in the order before creating the order
    
    
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        dispatch({ type: CART_CLEAR_ITEMS, payload: data });

        localStorage.removeItem("cartItems");
         // Return the created order data, including the assigned code
    return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
          // Return an error or null, depending on your needs
    return null;
    }
  };
  {/** 
  export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.post(`/api/orders`, order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_CLEAR_ITEMS, payload: data });
  
      localStorage.removeItem("cartItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };
  */}
  export const listOrders_tnagar = (keyword = " ") => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/orderst/all?keyword=${keyword}`, config);
  // const { data } = await axios.get(`/api/order/?keyword=${keyword}`, config);
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };
  /*
  export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/all`, config);
  
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };
  */
  // ORDER DETAILS
  export const getOrderDetails_tnagar = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/orderst/${id}`, config);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };

    // ORDER DETAILS

  export const getBillDetails_tnagar = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/orderst/${id}/billdetails`, config);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
  
  // ORDER DELIVER
  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERED_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.put(
        `/api/orderst/${order._id}/delivered`,
        {},
        config
      );
      dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DELIVERED_FAIL,
        payload: message,
      });
    }
  };
  
  //ORDER PAID
  export const paidOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.put(
        `/api/orderst/${order._id}/paid`,
        
        {},
        config
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };
  
 
  export const updatependingcash_tnagar = (
    orderId,
pendingcash,
  ) => async (dispatch, getState) => {
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
      
      const updatedOrder = {
        _id: orderId,
        pendingcash,
      };
     
  
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/pendingcashupdate`, // Make sure the route is correct
        updatedOrder,
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
  export const updatependingupi_tnagar = (
    orderId,
pendingupi,
pendingupiacct
  ) => async (dispatch, getState) => {
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
      
      const updatedOrder = {
        _id: orderId,
        pendingupi,
        pendingupiacct
      };
     
  
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/pendingupiupdate`, // Make sure the route is correct
        updatedOrder,
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
  export const updatependingbank_tnagar = (
    orderId,
pendingbank,
pendingbankacct
  ) => async (dispatch, getState) => {
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
      
      const updatedOrder = {
        _id: orderId,
        pendingbank,
        pendingbankacct
      };
     
  
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/pendingbankupdate`, // Make sure the route is correct
        updatedOrder,
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
  export const markItemAsDelivered = (orderId, itemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_MARK_DELIVERED_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Perform the API call to mark the item as delivered (you may need to implement this API endpoint)
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/isproductdelivered`, // Corrected URL with orderId only
        
        { itemId }, // Pass itemId in the request body if needed
        
        config
      );
      console.log(itemId);

      dispatch({ type: ORDER_MARK_DELIVERED_SUCCESS, payload: data });
    } 
    catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_MARK_DELIVERED_FAIL,
        payload: message,
      });
    }
  };
  export const markItemAstobetaken = (orderId, itemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_MARK_TOBETAKEN_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Perform the API call to mark the item as delivered (you may need to implement this API endpoint)
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/isproducttobetaken`, // Corrected URL with orderId only
        
        { itemId }, // Pass itemId in the request body if needed
        
        config
      );
      console.log(itemId);
      dispatch({ type: ORDER_MARK_TOBETAKEN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_MARK_TOBETAKEN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  export const markItemAsundelievered = (orderId, itemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_MARK_DELIVERED_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Perform the API call to mark the item as delivered (you may need to implement this API endpoint)
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/isproductundelivered`, // Corrected URL with orderId only
        
        { itemId }, // Pass itemId in the request body if needed
        
        config
      );
      dispatch({ type: ORDER_MARK_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_MARK_DELIVERED_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  export const markItemAsPaid= (orderId, itemId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_MARK_PAID_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Perform the API call to mark the item as delivered (you may need to implement this API endpoint)
      const { data } = await Axios.put(
        `/api/orderst/${orderId}/isproductpaid`, // Corrected URL with orderId only
        
        { itemId }, // Pass itemId in the request body if needed
        
        config
      );
      dispatch({ type: ORDER_MARK_PAID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_MARK_PAID_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  /*
  // ORDER PAY
  export const payOrder =
    (orderId) => async (dispatch, getState) => {
      try {
        dispatch({ type: ORDER_PAY_REQUEST });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await axios.put(
          `/api/orders/${orderId}/pay`,
          config
        );
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch({
          type: ORDER_PAY_FAIL,
          payload: message,
        });
      }
    };
    */