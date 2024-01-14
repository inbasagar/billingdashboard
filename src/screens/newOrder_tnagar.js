import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import Pagination from "../components/products/pagination";
import MainProducts_tnagar from "../components/products/MainProducts_tnagar";
import NewOrderMain_tnagar from "../components/products/NewOrderMain_tnagar";
import PaginationOrder_tnagar from "../components/products/paginationorder_tnagar";
const NewOrder_tnagar = ({match}) => {
  
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <NewOrderMain_tnagar keyword={keyword} pagenumber={pagenumber}/>
        <PaginationOrder_tnagar/>
      </main>
    </>
  );
};

export default NewOrder_tnagar;
