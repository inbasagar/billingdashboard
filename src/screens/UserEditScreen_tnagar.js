import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";
import Pagination from "../components/products/pagination";
//import EditCustomerMain from './../components/users/EditUserMain';
import EditCustomerMain_tnagar from "../components/users/EditUserMain_tnagar";
import UserComponent_tnagar from "../components/users/UserComponent_tnagar";

const UserEditScreen_tnagar = ({ match }) => {
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
        <EditCustomerMain_tnagar customerId={userId} />
      </main>
    </>
  );
};
export default UserEditScreen_tnagar;
