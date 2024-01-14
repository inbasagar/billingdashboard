import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain_tnagar from "../components/products/Editproduct_tnagar";


const ProductEditScreen_tnagar = ({ match }) => {
  const productId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain_tnagar productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen_tnagar;
