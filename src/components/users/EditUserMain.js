import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CUSTOMER_UPDATE_RESET } from "../../Redux/Constants/CustomerConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { editCustomer, updateCustomer } from "../../Redux/Actions/customerActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCustomerMain = (props) => {
  const {customerId} = props;
  //console.log(props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState();
  {/** 
  const [price_11X11,setPrice11X11]=useState(0);
  const [price_15X12,setPrice15X12]=useState(0);  
  const [price_10X8,setPrice10X8]=useState(0);
  const [price_10X12,setPrice10X12]=useState(0);
  const [price_12X15,setPrice12X15]=useState(0);
  */}

  const dispatch = useDispatch();

  const customerEdit = useSelector((state) => state.customerEdit);
  const { loading, error, customer } = customerEdit;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      toast.success("customer Updated", ToastObjects);
    } 
    
  }, [customer, dispatch, ]);


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      toast.success("customer Updated", ToastObjects);
    } else {
      if (!customer.name || customer._id !== customerId) {
        dispatch(editCustomer(customerId));
      } else {
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
        setCity(customer.city);
        setCountry(customer.country);
        setPostalCode(customer.postalCode);
        {/** 
        setPrice11X11(product.price_11X11);
        setPrice15X12(product.price_15X12);
        setPrice10X8(product.price_10X8);
        setPrice10X12(product.price_10X12);
        setPrice12X15(product.price_12X15);
        */}
      }
    }
  }, [customer, dispatch, customerId, successUpdate]);






  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCustomer({
        _id: customerId,
        name,
        email,
        phone,
        address,city,country,postalCode

      })
    );
  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/customers" className="btn btn-danger text-white">
              Go to Customers list
            </Link>
            <h2 className="content-title">Add Customer</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Create now
              </button>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      User name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      User email
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                    address
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                     city
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                     postalcode
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                    country
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
 
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        </form>
      </section>
    </>
  );
};

export default EditCustomerMain;
