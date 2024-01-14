import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain_annanagar from "../components/products/Editproduct_annanagar";


const ProductEditScreen_annanagar = ({ match }) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain_annanagar productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen_annanagar;
