import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";




import { login, register } from "../../Redux/Actions/userActions";
import Header from "../Header";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const AddEmployeeMain = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [employeename, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(password===confirmpassword)
    {
        dispatch(register(employeename, password));
    }

  };

  return (
    <>
   
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="Name"
            placeholder="Employee Name"
            value={employeename}
            onChange={(e) => setName(e.target.value)}
          />

            <input
            type="Phone"
            placeholder="Employee Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                    <input
            type="password"
            placeholder="Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p>
            <Link
             
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
 
    </>
  );
};

export default AddEmployeeMain;
