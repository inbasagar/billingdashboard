import {
EST_CREATE_REQUEST,EST_CREATE_SUCCESS,EST_CREATE_FAIL,EST_CREATE_RESET
  } from "../Constants/OrderConstants";

  export const ESTCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EST_CREATE_REQUEST:
        return { loading: true };
      case EST_CREATE_SUCCESS:
        return { loading: false, success: true, data: action.payload };
      case EST_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EST_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
