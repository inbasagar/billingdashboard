import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import OrderDetailmain_tnagar from "../components/orders_tnagar/OrderDetailmain_tnagar";

const OrderDetailScreen_tnagar = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain_tnagar orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen_tnagar;
