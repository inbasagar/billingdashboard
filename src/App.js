import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";

import AddUser from "./screens/AddUser";
import Login from "./screens/LoginScreen"
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProductstnagar, listorderedProductstnagar } from "./Redux/Actions/ProductActionst";
import { listOrders } from "./Redux/Actions/OrderActions";
import { listOrders_tnagar } from "./Redux/Actions/OrderActions_tnagar";
import { listcustomers } from "./Redux/Actions/customerActions";
//import EditCustomerMain from "./components/users/EditUserMain";
import UserEditScreen from "./screens/UserEditScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductScreen_tnagar from "./screens/productScreen_tnagar";
import ProductScreen_annanagar from "./screens/productScreen_annanagar";
import ProductScreen_adayar from "./screens/productScreen_adayar";
import ProductEditScreen_tnagar from "./screens/ProductEditScreen_tnagar";
import CartScreenTnagar from "./screens/CartScreenTnagar";
import ProductEditScreen_annanagar from "./screens/ProductEditScreen_annanagar";
import CartScreenAnnanagar from "./screens/CartScreenAnnanagar";
import BillingScreen from "./screens/BillingScreen";
import UsersScreen_tnagar from "./screens/UsersScreen_tnagar";
import PlaceOrderScreen_tnagar from "./screens/PlaceOrder_tnagar";
import PaymentScreen_tnagar from "./screens/PaymentScreen_tnagar";
import OrderScreen_tnagar from "./screens/OrderScreen_tnagar";
import OrderDetailScreen_tnagar from "./screens/OrderDetailScreen_tnagar";
import UsersScreen_annanagar from "./screens/UsersScreen_annanagar";
import PaymentScreen_annanagar from "./screens/PaymentScreen_annanagar";
import PlaceOrderScreen_annanagar from "./screens/PlaceOrder_annanagar";
import OrderScreen_annanagar from "./screens/OrderScreen_annanagar";
import OrderDetailScreen_annanagar from "./screens/OrderDetailScreen_annanagar";
import { listProductsannanagar } from "./Redux/Actions/ProductActionsanna";
import NewOrder_tnagar from "./screens/newOrder_tnagar";
import AddOrderedProduct_tnagar from "./screens/AddOrderedProduct_tnagar.js";
import newarrivalsScreen_tnagar from "./screens/newarrivalsScreen_tnagar.js";
import AddEmployee from "./screens/AddEmployee.js";
import UsersEditScreen_tnagar from "./screens/UserEditScreen_tnagar.js";



function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin&& userInfo.branch==="tnagar") {
      dispatch(listProductstnagar());
      dispatch(listorderedProductstnagar());
      //dispatch(listOrders());
      dispatch(listOrders_tnagar());
      dispatch(listcustomers());

    }
    if (userInfo && userInfo.isAdmin&& userInfo.branch==="annanagar") {
      dispatch(listProductsannanagar());
      //dispatch(listOrders());
      dispatch(listOrders_tnagar());
      dispatch(listcustomers());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
         
          <Route 
            path="/search/:keyword/page/:pagenumber"
            component={ProductScreen}
            exact
          />
      
          
          <PrivateRouter path="/page/:pagenumber" component={ProductScreen} />
          <PrivateRouter path="/paget/:pagenumber" component={ProductScreen_tnagar} />
          <PrivateRouter
            path="/search/:keyword/paget/:pagenumber"
            component={ProductScreen_tnagar}
            exact
          />

          <PrivateRouter path="/pagea/:pagenumber" component={ProductScreen_annanagar} />
          <PrivateRouter path="/pageot/:pagenumber" component={NewOrder_tnagar} />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/productst/" component={ProductScreen_tnagar} />
          <PrivateRouter path="/newarrivalst/" component={newarrivalsScreen_tnagar} />
          <PrivateRouter path="/search/:keyword" component={newarrivalsScreen_tnagar} />
          <PrivateRouter path="/pagearrivalst/:pagenumber" component={newarrivalsScreen_tnagar} />
          <PrivateRouter
            path="/search/:keyword/pagearrivalst/:pagenumber"
            component={newarrivalsScreen_tnagar}
            exact
          />
          <PrivateRouter path="/productsanna/" component={ProductScreen_annanagar} />
          <PrivateRouter path="/products/annanagar" component={ProductScreen_adayar} />
          <PrivateRouter path="/neworders/" component={NewOrder_tnagar} />
          <PrivateRouter
            path="/search/:keyword/pageot/:pagenumber"
            component={NewOrder_tnagar}
            exact
          />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/orderst" component={OrderScreen_tnagar} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/ordert/:id" component={OrderDetailScreen_tnagar} />
          <PrivateRouter path="/ordersanna" component={OrderScreen_annanagar} />
          <PrivateRouter path="/orderanna/:id" component={OrderDetailScreen_annanagar} />
          <PrivateRouter path="/bill/:id" component={BillingScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/addorder" component={AddOrderedProduct_tnagar} />

          <PrivateRouter path="/adduser" component={AddUser} />
          <PrivateRouter path="/addEmployee" component={AddEmployee} />
          <PrivateRouter path="/users" component={UsersScreen_tnagar} />
        
          <PrivateRouter path="/customers/" component={UsersScreen} />
   
          

          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <PrivateRouter
            path="/productt/:id/edit"
            component={ProductEditScreen_tnagar}
          />
          <PrivateRouter
            path="/productanna/:id/edit"
            component={ProductEditScreen_annanagar}
          />
          <PrivateRouter
            path="/customer/:id/edit"
            component={UserEditScreen}
          />
          <PrivateRouter
            path="/user/:id/edit"
            component={UsersEditScreen_tnagar}
          />          
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/cartt/:id?" component={CartScreenTnagar} />
          <Route path="/carta/:id?" component={CartScreenAnnanagar} />
          <PrivateRouter path="/shipping" component={UsersScreen} />
          <PrivateRouter path="/shippingt" component={UsersScreen_tnagar} />
          <PrivateRouter path="/shippinganna" component={UsersScreen_annanagar} />
          <PrivateRouter path="/payment" component={PaymentScreen} />
          <PrivateRouter path="/paymentt" component={PaymentScreen_tnagar} />
          <PrivateRouter path="/paymentanna" component={PaymentScreen_annanagar} />
          <PrivateRouter path ="/placeorder" component={PlaceOrderScreen}/>
          <PrivateRouter path ="/placeordert" component={PlaceOrderScreen_tnagar}/>
          <PrivateRouter path ="/placeorderanna" component={PlaceOrderScreen_annanagar}/>
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
