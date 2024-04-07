import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  //console.log(userInfo.istnagar);
 // console.log(userInfo.isOwner);
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/"
              style={{ height: "46" }}
              className="logo"
              alt=""
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Dashboard</span>
              </NavLink>
            </li>
            {userInfo && (userInfo.isOwner===true)&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products/all"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>
            )}
            {userInfo && ((userInfo.isOwner==true)||((userInfo.isAdmin === true)&&(userInfo.branch=='tnagar')))&&(
            
  <li className="menu-item">
    <NavLink
      activeClassName="active"
      className="menu-link"
      to="/productst/all"
    >
      <i className="icon fas fa-shopping-bag"></i>
      <span className="text">T.NAGAR</span>
    </NavLink>
  </li>
)}
                        {userInfo && ((userInfo.isOwner === true) || (userInfo.isAdmin === true && userInfo.branch === "annanagar"))&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/productsanna/all"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Anna Nagar</span>
              </NavLink>
            </li>
            )}
                                    {userInfo && ((userInfo.isOwner === true) || (userInfo.isAdmin === true && userInfo.branch === "adayar"))&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products/adayar"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">ADAYAR</span>
              </NavLink>
            </li>
            )}
            {userInfo && (userInfo.isOwner === true)&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Add product</span>
              </NavLink>
            </li>
            )}
           {userInfo && ( (userInfo.isOwner === false) &&(userInfo.isAdmin === true && userInfo.branch === "tnagar"))&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orderst/all"
              >
                <i className="icon fas fa-bags-shopping"/>
                <span className="text">Bills</span>
              </NavLink>
            </li>
           )}
            {userInfo && ((userInfo.isOwner === false) && (userInfo.isAdmin === true && userInfo.branch === "tnagar"))&&(
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/ordersanna/all"
              >
                <i className="icon fas fa-bags-shopping"/>
                <span className="text">Bills</span>
              </NavLink>
            </li>
           )}
                    {userInfo && (
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownBills"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="text">Bills</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownBills"
              >
                {((userInfo.isOwner === true) ||
                  (userInfo.isAdmin === true && userInfo.branch === "tnagar")) && (
                  <Link className="dropdown-item" to="/orderst/all">
                
                  <span className="text">T.Nagar Bills</span>
                  </Link>
                )}
                {((userInfo.isOwner === true) ||
                  (userInfo.isAdmin === true && userInfo.branch === "annanagar")) && (
                  <Link className="dropdown-item" to="/ordersanna/all">
                  
                    <span className="text">Anna Nagar Bills</span>
                  </Link>
                )}
                {/* Add more links for other branches if needed */}
              </div>
            </li>
          )}

            {userInfo && userInfo.isAdmin !== false && (
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/customers/"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Customers</span>
              </NavLink>
            </li>
            )}
          {userInfo && userInfo.isAdmin !== false && (
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/neworders/"
              >
                <i className="icon fa fa-truck" ></i>
                <span className="text">Orders</span>
              </NavLink>
            </li>
            )}

    
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
