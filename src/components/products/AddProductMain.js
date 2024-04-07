import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createNewarrivaltnagar, createProducttnagar } from "../../Redux/Actions/ProductActionst";
import { createProductannanagar } from "../../Redux/Actions/ProductActionsanna";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
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
      setHeight();
      setWidth();
      setIsavailability("shop");
      setBranch("");
      setSize("");
      {/** 
      setPrice11X11(0);
      setPrice15X12(0);
      */}

    }
  }, [product, dispatch]);

  const submitHandler =  async (e) => {
    e.preventDefault();
  
    const buttonClicked = e.nativeEvent.submitter.name;
  
    if (buttonClicked === "addToTnagar") {
      const createdproduct=   dispatch(createProducttnagar(name, price, description, image, countInStock,size,isavailability,"tnagar"));
      console.log("outside",createdproduct);
      if (createdproduct) {
        // createdproduct the order details including the assigned code
        const { _id, code } = createdproduct;
        console.log("createproduct");
        console.log(code);
        // Perform actions with the order details
       // dispatch(createNewarrivaltnagar({name:name, price:price, description:description, image:image, countInStock:countInStock,product_code:code ,size:size, isavailability:isavailability, branch:"tnagar"}));

  
 
      }
    }

    if(buttonClicked === "addToAnnanagar")
    {
      dispatch(createProductannanagar(name, price, description, image, countInStock, height, width, isavailability, "annanagar"));
    } 


   
    

  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={(e) => submitHandler(e, "tnagar")}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
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
                  {/** 
                  <div className="mb-4">
                    <label className="form-label">Height</label>
                    <textarea
                      placeholder="Type Height"
                       className="form-control"
                          
                      
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">width</label>
                    <textarea
                        placeholder="Type width"
                        className="form-control"
                          
                        
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                    ></textarea>
                  </div>
                  */}
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
            <div className="content-header">
              <button type="submit" className="btn btn-primary mb-2" name="all">
                Publish Now
              </button>
              <button type="submit" className="btn btn-primary mb-2" name="addToTnagar">
                Add to Hyderabad
              </button>

            </div>
            <div className="content-header">
              <button type="submit" className="btn btn-primary mb-2" name="addToAnnanagar">
                Add to Annanagar
              </button>
              <button type="submit" className="btn btn-primary mb-2" name="addToTnagar">
                Add to Adayar
              </button>
            </div>
          </div>
          
          </div>

        </form>

      </section>
    </>
  );
};

export default AddProductMain;
