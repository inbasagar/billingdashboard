import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CUSTOMER_UPDATE_RESET } from "../../Redux/Constants/CustomerConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { editCustomer, updateCustomer } from "../../Redux/Actions/customerActions";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";
import { editUser, updateUser } from "../../Redux/Actions/userActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCustomerMain_tnagar = (props) => {
  const {userId} = props;
  //console.log(props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  {/** 
  const [price_11X11,setPrice11X11]=useState(0);
  const [price_15X12,setPrice15X12]=useState(0);  
  const [price_10X8,setPrice10X8]=useState(0);
  const [price_10X12,setPrice10X12]=useState(0);
  const [price_12X15,setPrice12X15]=useState(0);
  */}

  const dispatch = useDispatch();

  const userEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = userEdit;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("user Updated", ToastObjects);
    } 
    
  }, [user, dispatch, ]);


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("user Updated", ToastObjects);
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(editUser(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);

        
        {/** 
        setPrice11X11(product.price_11X11);
        setPrice15X12(product.price_15X12);
        setPrice10X8(product.price_10X8);
        setPrice10X12(product.price_10X12);
        setPrice12X15(product.price_12X15);
        */}
      }
    }
  }, [user, dispatch, userId, successUpdate]);






  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,


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
                Update 
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

export default EditCustomerMain_tnagar;
