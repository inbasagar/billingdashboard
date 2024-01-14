import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import Pagination from "../components/products/pagination";
import MainProducts_annanagar from "../components/products/MainProducts_annanagar";
const ProductScreen_annanagar = ({match}) => {
  
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts_annanagar keyword={keyword} pagenumber={pagenumber}/>
        <Pagination/>
      </main>
    </>
  );
};

export default ProductScreen_annanagar;
