import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain_annanagar from "../components/orders_annanagar/OrderDetailmain_annanagar";


const OrderDetailScreen_annanagar = ({ match }) => {
  const orderId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain_annanagar orderId={orderId} />
      </main>
    </>
  );
};

export default OrderDetailScreen_annanagar;
