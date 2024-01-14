
import{
    CUSTOMER_LIST_FAIL,
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_RESET,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LOGIN_FAIL,
    CUSTOMER_LOGIN_REQUEST,
    CUSTOMER_LOGIN_SUCCESS,
    CUSTOMER_LOGOUT,
    CUSTOMER_CREATE_FAIL,
    CUSTOMER_CREATE_REQUEST,
    CUSTOMER_CREATE_SUCCESS,
    CUSTOMER_DELETE_FAIL,
    CUSTOMER_DELETE_REQUEST,
    CUSTOMER_DELETE_SUCCESS,
    CUSTOMER_EDIT_FAIL,
    CUSTOMER_EDIT_REQUEST,
    CUSTOMER_EDIT_SUCCESS,
    CUSTOMER_UPDATE_FAIL,
    CUSTOMER_UPDATE_REQUEST,
    CUSTOMER_UPDATE_SUCCESS,
  } from "../Constants/CustomerConstants.js";
  import Axios from "../axios.js";
  import { toast } from "react-toastify";
  
  // LOGIN
  export const login = (email, password) => async (dispatch) => {
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      autoClose: 2000,
    };
    try {
      dispatch({ type: CUSTOMER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await Axios.post(
        `/api/users/login`,
        { email, password },
        config
      );
  
      if (!data.isAdmin === true) {
        toast.error("You are not Admin", ToastObjects);
        dispatch({
          type: CUSTOMER_LOGIN_FAIL,
        });
      } else {
        dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
      }
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CUSTOMER_LOGIN_FAIL,
        payload: message,
      });
    }
  };
  
  // LOGOUT
  export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: CUSTOMER_LOGOUT });
    dispatch({ type: CUSTOMER_LIST_RESET });
  };
  
  /**  ALL USER
  export const listUser = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await Axios.get(`/api/users/`, config);
  
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };
  */

  export const listCustomer = (keyword=" ",pageNumber=" ") => async (dispatch) => {
    try {
      dispatch({ type: CUSTOMER_LIST_REQUEST });

  
      const { data } = await Axios.get(`/api/customers?pageNumber=${pageNumber}&keyword=${keyword}`);
  
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
  {/** 
  export const listCustomer = () => async (dispatch, getState) => {
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
  
      const { data } = await Axios.get(`/api/customers/`, config);
  
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
  

*/}
  export const listCustomerDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CUSTOMER_LIST_REQUEST });
      const { data } = await Axios.get(`/api/customers/${id}`);
      dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CUSTOMER_LIST_FAIL,
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
    (name, email,phone,address,city,country,postalCode) =>
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
          { name, email,phone,address,city,country,postalCode},
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
  
  // EDIT USER
  export const editCustomer = (id) => async (dispatch,getState) => {
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
  
  // UPDATE USER
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
        `/api/customers/${customer._id}/edit`,
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