import {
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_EDIT_FAIL,
  CUSTOMER_EDIT_REQUEST,
  CUSTOMER_EDIT_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_SUCCESS
} from "../Constants/CustomerConstants";
import Axios from "../axios.js";
import { logout } from "./userActions";



export const listcustomers = (keyword = " ",pageNumber=" ") => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await Axios.get(`/api/customers?pageNumber=${pageNumber}&keyword=${keyword}`, config);
//?pageNumber=${pageNumber}
    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    });
  }
};


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


// EDIT PRODUCT
export const editCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_EDIT_REQUEST });
    const { data } = await Axios.get(`/api/customers/${id}`);
    dispatch({ type: CUSTOMER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_REQUEST });

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
      `/api/customers/${customer._id}`,
      customer,
      config
    );

    dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CUSTOMER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const listCustomerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST });
    const { data } = await Axios.get(`/api/customers/${id}`);
    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
  // DELETE USER
  export const deleteCustomer = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await Axios.delete(`/api/customers/${id}`, config);
  
      dispatch({ type: CUSTOMER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  // CREATE USER
  export const createCustomer =
    (name, email,phone,address,city,country,postalCode,gstno) =>
    async (dispatch, getState) => {
      try {
        dispatch({ type: CUSTOMER_CREATE_REQUEST });
  
        const {
          userLogin: { userInfo },
        } = getState();
  
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
  
        const { data } = await Axios.post(
          `/api/customers/`,
          { name, email,phone,address,city,country,postalCode,gstno},
          config
        );
  
        dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch({
          type: CUSTOMER_CREATE_FAIL,
          payload: message,
        });
      }
    };