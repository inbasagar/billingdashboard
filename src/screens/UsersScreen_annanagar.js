import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import Pagination from "../components/products/pagination";

const UsersScreen_annanagar = ({match}) => {
  const keyword = match.params.keyword;

  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
     
        <Pagination/>
      </main>
    </>
  );
};

export default UsersScreen_annanagar;
