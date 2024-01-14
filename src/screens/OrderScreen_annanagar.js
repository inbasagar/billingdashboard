import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain_annanagar from "../components/orders_annanagar/OrderDetailmain_annanagar";


const OrderScreen_annanagar = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain_annanagar />
      </main>
    </>
  );
};

export default OrderScreen_annanagar;
