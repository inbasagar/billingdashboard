import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";
import Pagination from "../components/products/pagination";
const UsersScreen = ({match}) => {
  const keyword = match.params.keyword;

  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent keyword={keyword} pagenumber={pagenumber} />
        <Pagination/>
      </main>
    </>
  );
};

export default UsersScreen;
