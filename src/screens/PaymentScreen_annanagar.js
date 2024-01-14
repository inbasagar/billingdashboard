import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import Sidebar from "./../components/sidebar";

const PaymentScreen_annanagar = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shippingt");
  }

  const [paymentMethod, setPaymentMethod] = useState("ONLINE PAYMENT");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorderanna");
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECT PAYMENT METHOD</h6>
          <div className="payment-container">
            <div class="form-check">
              <div className="radio-container">
                <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault" id="flexRadioDefault2"  
                checked={paymentMethod === "ONLINE PAYMENT"}
                value="ONLINE PAYMENT"
                onChange={() => setPaymentMethod("ONLINE PAYMENT")}
                />
                <label className="form-check-label">Online payment (Card, UPI, Netbanking )</label>
              </div>
              <div className="radio-container">
                <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault" id="flexRadioDefault2"  
                checked={paymentMethod === "CASH"}
                value="CASH"
                onChange={() => setPaymentMethod("CASH")}
                />
                <label className="form-check-label">Cash (CASH)</label>
              </div>
            </div>
            {/** 
            <div class="form-check">
              <div className="radio-container">
                <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault" id="flexRadioDefault2" 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod("COD")}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>
            </div>
            */}
          </div>
        

          <button type="submit">Continue</button>
        </form>
      </div>

    </>
  );
};

export default PaymentScreen_annanagar;
