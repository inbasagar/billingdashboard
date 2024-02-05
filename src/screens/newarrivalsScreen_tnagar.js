import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import Pagination from "../components/products/pagination";
import MainProducts_tnagar from "../components/products/MainProducts_tnagar";
import AddProductMain from './../components/products/AddProductMain';
import NewarrivalsMain_tnagar from "../components/orders_tnagar/NewarrivalsMain_tnagar";
import Pagination_tnagar from "../components/products/paginationt";
const newarrivalsScreen_tnagar = ({match}) => {
  
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <NewarrivalsMain_tnagar keyword={keyword} pagenumber={pagenumber}/>
      
        <Pagination_tnagar/>
      </main>
    </>
  );
};

export default newarrivalsScreen_tnagar;
