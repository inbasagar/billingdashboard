import React from "react";
import Header from "../components/Header";

import Sidebar from "./../components/sidebar";

const HomeScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        
      </main>
    </>
  );
};

export default HomeScreen;
