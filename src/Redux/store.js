import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer, userCreateReducer, userDeleteReducer, userEditReducer, userUpdateReducer } from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
  
} from "./Reducers/ProductReducers";
import { newarrivalsListReducer } from "./Reducers/ProductReducers";
import { customerCreateReducer, customerListReducer, customerEditReducer, customerUpdateReducer, customerDeleteReducer } from "./Reducers/CustomerReducer";
import {
  orderCreateReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMarkDeliveredReducer,
  orderMarkTobetakenReducer,
  orderPaidReducer,

} from "./Reducers/OrderReducres";
import { cartReducer } from "./Reducers/CartReducers";
import { ESTCreateReducer } from "./Reducers/EstReducers";



const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,

  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  orderMarkDelivered:orderMarkDeliveredReducer,
 orderMarkTobetaken:orderMarkTobetakenReducer,
  orderpaid:orderPaidReducer,
  orderCreate:orderCreateReducer,

  customerCreate:customerCreateReducer,
  customerList: customerListReducer,
  customerEdit: customerEditReducer,
  customerUpdate: customerUpdateReducer,
  customerDelete:customerDeleteReducer,
  cart: cartReducer,
  newarrivals:newarrivalsListReducer,

 ESTCreate: ESTCreateReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
