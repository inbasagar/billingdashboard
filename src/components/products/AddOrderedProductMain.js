import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createOrderedProducttnagar, createProducttnagar } from "../../Redux/Actions/ProductActionst";
import { createProductannanagar } from "../../Redux/Actions/ProductActionsanna";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddOrderedProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState(""); 
  const [isavailability,setIsavailability]= useState("");
  const[branch,setBranch]=useState("");
  const[size,setSize]=useState("");
  {/*}
  const [price_11X11,setPrice11X11]=useState(0);
  const [price_15X12,setPrice15X12]=useState(0);
  */} 
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice();
    //  setHeight();
    //  setWidth();
    setSize()
      setIsavailability("ordered");
      setBranch("");
      {/** 
      setPrice11X11(0);
      setPrice15X12(0);
      */}

    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    const buttonClicked = e.nativeEvent.submitter.name;
  
    if (buttonClicked === "addToTnagar") {
      dispatch(createOrderedProducttnagar(name, price, description, image, countInStock, size, "ordered", "tnagar"));
    }
    if(buttonClicked === "addToAnnanagar")
    {
      dispatch(createProductannanagar(name, price, description, image, countInStock, size, "ordered", "annanagar"));
    } 

  };
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={(e) => submitHandler(e, "tnagar")}>
          <div className="content-header">
            <Link to="neworders/" className="btn btn-danger text-white">
              Go to Orders list
            </Link>
            <h2 className="content-title">Create New Order</h2>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
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
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">size</label>
                    <textarea
                        placeholder="Type width"
                        className="form-control"
                 
                        id="product_title"
                      
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Notes</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  {/** 
                  <div className="mb-4">
                    <label className="form-label">Branch</label>
                    <textarea
                        placeholder="Type branch"
                        className="form-control"
                          
                        required
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    ></textarea>
                  </div>
*/}
                  {/** 
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price of 11 X 11 Size
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price_11X11}
                      onChange={(e) => setPrice11X11(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price of 15 X 12 Size
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price_15X12}
                      onChange={(e) => setPrice15X12(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    
                    {/*
                    <input className="form-control mt-3" type="file" />
                   
                  </div>
                */}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
            {userInfo && ((userInfo.isOwner==true)||((userInfo.isAdmin === true)&&(userInfo.branch=='tnagar')))&&(
            <div className="content-header">

              
              <button type="submit" className="btn btn-primary mb-2" name="addToTnagar">
                Add to T.Nagar
              </button>

            </div>
            )}
            
            <div className="content-header">
            {userInfo && ((userInfo.isOwner==true)||((userInfo.isAdmin === true)&&(userInfo.branch=='annanagar')))&&(
              <button type="submit" className="btn btn-primary mb-2" name="addToAnnanagar">
                Add to Annanagar
              </button>
            )}
            {userInfo && ((userInfo.isOwner==true)||((userInfo.isAdmin === true)&&(userInfo.branch=='adayar')))&&(
              <button type="submit" className="btn btn-primary mb-2" name="addToTnagar">
                Add to Adayar
              </button>
            )}
            </div>
          </div>
          
          </div>

        </form>

      </section>
    </>
  );
};

export default AddOrderedProductMain;
