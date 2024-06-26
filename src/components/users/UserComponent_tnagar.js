import React, { useEffect ,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
//import Orders from "./Orders";
import Customer from "../users/Customer"
import User from "./User";
import Pagination from "../products/pagination";
import { listCustomer,  listcustomers,deleteCustomer, listCustomerDetails } from "../../Redux/Actions/customerActions";
import { saveShippingAddress } from "../../Redux/Actions/cartActions";
import { listProducts } from "../../Redux/Actions/ProductActions";
import { deleteUser, listUser, listUserDetails } from "../../Redux/Actions/userActions";
//import { deleteCustomer } from './../../Redux/Actions/customerActions';





const UserComponent_tnagar = (props) => {
  
  // const{keyword: propKeyword, pagenumber } = props;
 
 const { keyword: propKeyword, pagenumber } = props;
 const [keyword, setKeyword] = useState(propKeyword );
  //const { keyword: propKeyword, keyword1: propKeyword1, pagenumber } = props;
  
  //const [keyword1, setKeyword1] = useState(propKeyword1);
  
  //const { keyword1: propKeyword1, keyword2: propKeyword2, pagenumber } = props;
  //const [keyword1, setKeyword1] = useState(propKeyword1);
  //const [keyword2, setKeyword2] = useState(propKeyword2);

  const dispatch = useDispatch();
  let history = useHistory();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, page, pages } = userList;
 //const { loading, error, customers, page, pages } = customerList;

  //console.log('Customers:', customers);
  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;
  //const UserList = useSelector((state) => state.UserList);
  //const { loading, error, users, page, pages } = UserList;
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
    //  history.push(`/search/${keyword}`);
      history.push(`/customers/${keyword}`);
    } else {
      history.push("/");
    }
  };
  const orderHandler=(customer)=>
  {
    
    //dispatch(saveShippingAddress({name: customer.name,email:customer.email}));
    dispatch(saveShippingAddress({name :customer.name,email:customer.email,phone:customer.phone,address:customer.address,city:customer.city,country:customer.country,postalCode:customer.postalCode,GSTNO:customer.GSTNO}));
    history.push("/placeordert");
  };

  const deleteCustomerHandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    dispatch(listUser(keyword, pagenumber));
    

 
  }, [dispatch, keyword, pagenumber, successDelete]);



  return (
    
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="/addUser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
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
      </div>

      <table className="table border table-lg">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "10%" }}>Phone</th>
            <th style={{ width: "10%" }}>Email</th>
            <th style={{ width: "20%" }}>Address</th>
            <th style={{ width: "10%" }}>View</th>

            <th style={{ width: "10%" }} className="">
              Bill
            </th>
            <th style={{ width: "10%" }} className="">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {users.map((user) => (
                <tr key={user._id}>
                  <User user={user} />
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link
                      to={`/user/${user._id}/edit`}
                      className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                    >
                     <i class="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="#"
                      onClick={() => orderHandler(user)}
                      className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                    >
                      <i class="fa fa-truck" aria-hidden="true"></i>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="#"
                      onClick={() => deleteCustomerHandler(user._id)}
                      className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </Link>
                  </td>

                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </section>

  );
};

export default UserComponent_tnagar;
