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
    EST_CREATE_SUCCESS,
    EST_CREATE_REQUEST,
    EST_CREATE_FAIL
   
  } from "../Constants/OrderConstants";
  import { PRODUCT_EDIT_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants.js";
  import { logout } from "./userActions";
  import Axios from "../axios.js";
  import { CART_CLEAR_ITEMS } from "../Constants/CartConstants.js";

  
  

  
  export const EST_tnagar = (order) => async (dispatch, getState) => {
    try {

      dispatch({ type: EST_CREATE_REQUEST });
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
          
  
  
  
    

  
  
      // Update product counts for each item in the order before creating the order
    
      //console.log(order.orderId);
     // const { data1 } = await Axios.get(`/api/orderst/${id}`, config);
      //console.log(data1);
       const { data } = await Axios.post(`/api/est`, order,config);
      dispatch({ type: EST_CREATE_SUCCESS, payload: data });


   
        
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: EST_CREATE_FAIL,
        payload: message,
      });
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

  export const updatesalesexpensecashupdate = (
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
   

    const { data } = await Axios.post(
      `/api/est/${orderId}/cashupdate`, // Make sure the route is correct
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

export const updatesalesexpensebankupdate = (
  orderId,
pendingbank,
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
  };
 

  const { data } = await Axios.post(
    `/api/est/${orderId}/bankupdate`, // Make sure the route is correct
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

export const updatesalesexpenseupiupdate = (
orderId,
pendingupi,
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
};


const { data } = await Axios.post(
  `/api/est/${orderId}/upiupdate`, // Make sure the route is correct
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
    // ORDER DETAILS


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