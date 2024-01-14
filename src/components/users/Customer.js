import React ,{useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer, editCustomer, listCustomer, listCustomerDetails } from "../../Redux/Actions/customerActions";
import { useState } from "react";
import { saveShippingAddress } from "../../Redux/Actions/cartActions";
const Customer = (props) => {
  const { customer } = props;
 
  let history = useHistory();
  const dispatch = useDispatch();
 
  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteCustomer(id));
    }
  };
 
 

  const orderHandler=(e)=>
  {
    e.preventDefault();
    //dispatch(saveShippingAddress({name: customer.name,email:customer.email}));
    dispatch(saveShippingAddress({name :customer.name,email:customer.email,phone:customer.phone,address:customer.address,city:customer.city,country:customer.country,postalCode:customer.postalCode}));
    history.push("/placeordert");
  };

  useEffect(()=>
  {
    dispatch(listCustomerDetails(customer._id));
  }, [dispatch,customer.id]);

  return (
    <>
    {/** 
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">

        <div className="card card-product-grid shadow-sm">


          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {customer.name}
            </Link>
            
            <div className="row">
              <Link
                to={`/customer/${customer._id}/edit`}

                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(customer._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
              <Link
                to="#"
                onClick={(e) => orderHandler(e)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    
*/}
      </>
      
  );

};

export default Customer;
