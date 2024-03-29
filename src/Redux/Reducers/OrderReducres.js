import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_MARK_TOBETAKEN_FAIL,ORDER_MARK_TOBETAKEN_REQUEST,ORDER_MARK_TOBETAKEN_SUCCESS,
  ORDER_MARK_DELIVERED_FAIL,ORDER_MARK_DELIVERED_REQUEST,ORDER_MARK_DELIVERED_SUCCESS,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,ORDER_CREATE_RESET, ORDER_MARK_TOBETAKEN_RESET, ORDER_MARK_DELIVERED_RESET
} from "../Constants/OrderConstants";
const initialState = {
  orders: [],
  orderDetails: { orderItems: [], shippingAddress: {} },
  orderMarkDelivered: {
    loading: false,
    success: false,
    error: null,
  },
  // other properties...
};
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DETAILS
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ORDER DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

// ORDER DELIVERED
export const orderPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderMarkDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_MARK_DELIVERED_REQUEST:
      return {
        //...state,
        //orderMarkDelivered: {
          //...state.orderMarkDelivered,
          loading: true
       // },
      };
    case ORDER_MARK_DELIVERED_SUCCESS:
      return {
        //...state,
      //  orderMarkDelivered: {
        //  ...state.orderMarkDelivered,
          loading: false,
          success: true
      //  },
      };
    case ORDER_MARK_DELIVERED_FAIL:
      return {
       // ...state,
       // orderMarkDelivered: {
       //   ...state.orderMarkDelivered,
          loading: false,
          error: action.payload
       // },
      };
      case ORDER_MARK_DELIVERED_RESET:
        return {};
       
    default:
      return state;
  }
};
  export const orderMarkTobetakenReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_MARK_TOBETAKEN_REQUEST:
        return {
          //...state,
          //orderMarkDelivered: {
            //...state.orderMarkDelivered,
            loading: true
         // },
        };
      case ORDER_MARK_TOBETAKEN_SUCCESS:
        return {
          //...state,
        //  orderMarkDelivered: {
          //  ...state.orderMarkDelivered,
            loading: false,
            success: true
        //  },
        };
      case ORDER_MARK_TOBETAKEN_FAIL:
        return {
         // ...state,
         // orderMarkDelivered: {
         //   ...state.orderMarkDelivered,
            loading: false,
            error: action.payload
         // },
        };
        case ORDER_MARK_TOBETAKEN_RESET:
          return {};
         
      default:
        return state;
    }
};