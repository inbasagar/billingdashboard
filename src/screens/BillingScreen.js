import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import BillingDetailMain from "../components/orders/BillingDetailMain";

const BillingScreen = ({ match }) => {
  const billId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <BillingDetailMain billId={billId} />
      </main>
    </>
  );
};

export default BillingScreen;
