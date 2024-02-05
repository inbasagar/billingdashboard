import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain_tnagar from "../components/products/Editproduct_tnagar";
import MainProducts_tnagar from "../components/products/MainProducts_tnagar";


const ProductEditScreen_tnagar = ({ match }) => {
  const productId = match.params.id;
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts_tnagar keyword={keyword} pagenumber={pagenumber}/>
        <EditProductMain_tnagar productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen_tnagar;
