import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders_tnagar from "./Orders_tnagar";
import { useSelector } from "react-redux";

const OrderMain_tnagar = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Billing Detail</h2>
      </div>
   
      <div className="card mb-4 shadow-sm">
        {/*
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        
        </header>
        */}
  {/**                     <header className="card-header">
          <div className="row gx-3">
            <form className="col-lg-4 col-md-6 me-auto" onSubmit={submitHandler}>
  
              <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
              onChange={(e) => setKeyword(e.target.value)}
            />
 
            </form>
          </div>
        </header>
      **/}
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders_tnagar orders={orders} />
            )}
          </div>
        </div>
      </div>
    
    </section>
  );
};

export default OrderMain_tnagar;
