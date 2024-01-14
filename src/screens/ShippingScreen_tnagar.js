import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen_tnagar = ({ history }) => {
{/*window.scrollTo(0, 0);*/}
  
  const cart=useSelector((state)=>state.cart);
  const{shippingAddress}=cart;
  const[name,setName]=useState(shippingAddress.name);
  const[email,setEmail]=useState(shippingAddress.email);
  const[phone,setPhone]=useState(shippingAddress.phone);
  const[address,setAddress]=useState(shippingAddress.address);
  const[city,setCity]=useState(shippingAddress.city);
  const[state,setState]=useState(shippingAddress.state);
  const[postalCode,setPostalCode]=useState(shippingAddress.postalCode);
  const[country,setCountry]=useState(shippingAddress.country);

  
  const [keyword, setKeyword] = useState( );

  const dispatch = useDispatch();
  const submitHandler=(e)=>
  {
    e.preventDefault();
    dispatch(saveShippingAddress({name,email,phone,address,city,country,postalCode}));
    //dispatch(saveShippingAddress({name,email,phone,address,city,country,postalCode}));
    history.push("/paymentt");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
    //  history.push(`/search/${keyword}`);
      history.push(`/customers/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center ship-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search customers"
           
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      
        <form
          className=" Ship col-md-8 col-lg-6 "style={{ Width: "600px" }}
          onSubmit={submitHandler}
        >
          
          <h6>BILLING DETAILS</h6>
          <div className="Ship-label">
          <label> Name* </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            
          />
          </div>
          <div className="Ship-label">
          <label> Email address* </label>
          <input
            type="text"
            placeholder="Enter your email id"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <label> Phone* </label>
          <input
            type="text"
            placeholder="Enter phone number with coutry code +91"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            
          />
          
          <label>Address * </label>
          <input
            type="text"
            placeholder="Enter street address "
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            
          />
          <label>District / City* </label>
          <input
            type="text"
            placeholder="Enter your city "
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            
          />
          <label>State* </label>
          <input
            type="text"
            placeholder="Enter your state name"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
            
          />
          <label>Country* </label>
          <input
            type="text"
            placeholder="Enter your Country name"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            
          />
          <label>postalCode* </label>          
          <input
            type="number"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            
          />
          </div>



          <button type="submit">Continue</button>
        </form>
      </div>

    </>
  );
};

export default ShippingScreen_tnagar;
