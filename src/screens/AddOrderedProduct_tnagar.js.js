import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddProductMain from "./../components/products/AddProductMain";
import AddOrderedProductMain from "../components/products/AddOrderedProductMain";

const AddOrderedProduct_tnagar = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddOrderedProductMain />
      </main>
    </>
  );
};

export default AddOrderedProduct_tnagar;
