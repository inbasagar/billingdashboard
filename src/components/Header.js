import React, { useEffect } from "react";
import { Link,useHistory } from "react-router-dom";
import $ from "jquery";
import { useDispatch , useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../Redux/Actions/userActions"; //

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
    //  history.push(`/search/${keyword}`);
      history.push(`/bill/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <header className="main-header navbar">
      <div className="col-search">
        <form className="searchform" onSubmit={submitHandler}>
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Search term"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div>
      <div className="col-nav">
        <button
          className="btn btn-icon btn-mobile me-auto"
          data-trigger="#offcanvas_aside"
        >
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          {/** 
          <li class="nav-item">
            <Link className="nav-link btn-icon" to="/cart">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="badge">{cartItems.length}</span>
            </Link>        
          </li>
          */} 
          {userInfo && ((userInfo.isOwner === true) || (userInfo.isAdmin === true && userInfo.branch === "tnagar"))&&(
          <li class="nav-item">
            <Link className="nav-link btn-icon" to="/cartt">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="badge">{cartItems.length}</span>
            </Link>        
          </li> 
          )}
                    {userInfo && ((userInfo.isOwner === true) || (userInfo.isAdmin === true && userInfo.branch === "annanagar"))&&(
          <li class="nav-item">
            <Link className="nav-link btn-icon" to="/carta">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="badge">{cartItems.length}</span>
            </Link>        
          </li> 
          )}

          <li className="nav-item">
            <Link className="nav-link btn-icon" to="#">
              <i className="fas fa-bell"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              English
            </Link>
          </li>
          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img
                className="img-xs rounded-circle"
                src="/images/"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My profile
              </Link>
              <Link className="dropdown-item" to="#">
                Settings
              </Link>
              <Link
                onClick={logoutHandler}
                className="dropdown-item text-danger"
                to="#"
              >
                Exit
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
