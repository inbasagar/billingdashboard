import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import Pagination from "../components/products/pagination";
import UserComponent_tnagar from "../components/users/UserComponent_tnagar";
import UserComponent_annanagar from "../components/users/UserComponent_annanagar";
const UsersScreen_annanagar = ({match}) => {
  const keyword = match.params.keyword;

  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent_annanagar keyword={keyword} pagenumber={pagenumber} />
        <Pagination/>
      </main>
    </>
  );
};

export default UsersScreen_annanagar;
