import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";
import Pagination from "../components/products/pagination";
import EditCustomerMain from './../components/users/EditUserMain';

const UserEditScreen = ({ match }) => {
  const customerId = match.params.id;
  const keyword = match.params.keyword;

  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent keyword={keyword} pagenumber={pagenumber} />
        <Pagination/>
        <EditCustomerMain customerId={customerId} />
      </main>
    </>
  );
};
export default UserEditScreen;
