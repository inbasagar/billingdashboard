import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderMain_tnagar from "../components/orders_tnagar/OrderMain_tnagar";

const OrderScreen_tnagar = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderMain_tnagar />
      </main>
    </>
  );
};

export default OrderScreen_tnagar;
