import React ,{useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCustomer, editCustomer, listCustomer, listCustomerDetails } from "../../Redux/Actions/customerActions";
import { useState } from "react";
import { saveShippingAddress } from "../../Redux/Actions/cartActions";
import { deleteUser, listUser, listUserDetails } from "../../Redux/Actions/userActions";
const User = (props) => {
  const { user } = props;
 
  let history = useHistory();
  const dispatch = useDispatch();
 
  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteUser(id));
    }
  };
 
 


  useEffect(()=>
  {
    dispatch(listUserDetails(user._id));
  }, [dispatch,user.id]);

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

export default User;
