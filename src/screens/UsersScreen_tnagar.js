import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import Pagination from "../components/products/pagination";
import UserComponent_tnagar from "../components/users/UserComponent_tnagar";
import EditCustomerMain_tnagar from "../components/users/EditUserMain_tnagar";
const UsersScreen_tnagar = ({match}) => {
  const userId = match.params.id;
  const keyword = match.params.keyword;

  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent_tnagar keyword={keyword} pagenumber={pagenumber} />
        <Pagination/>
       
      </main>
    </>
  );
};

export default UsersScreen_tnagar;
