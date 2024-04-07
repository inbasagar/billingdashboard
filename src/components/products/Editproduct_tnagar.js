import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createNewarrivaltnagar, editProducttnagar, updateProducttnagar } from "../../Redux/Actions/ProductActionst";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain_tnagar = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const[size,setSize]=useState("");
  const[code,setCode]=useState("");
  {/** 
  const [price_11X11,setPrice11X11]=useState(0);
  const [price_15X12,setPrice15X12]=useState(0);  
  const [price_10X8,setPrice10X8]=useState(0);
  const [price_10X12,setPrice10X12]=useState(0);
  const [price_12X15,setPrice12X15]=useState(0);
  */}

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  const increaseCountInStock = () => {
    setCountInStock((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProducttnagar(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setHeight(product.height);
        setWidth(product.width);
        setSize(product.size);
        setCode(product.code);
        {/** 
        setPrice11X11(product.price_11X11);
        setPrice15X12(product.price_15X12);
        setPrice10X8(product.price_10X8);
        setPrice10X12(product.price_10X12);
        setPrice12X15(product.price_12X15);
        */}
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProducttnagar({
        _id: productId,
        name,
        price,
        description,
        image,
        countInStock,
        height,
        width,
        size,
      

      })
    );
    const increasedCount = countInStock - product.countInStock;
    if (increasedCount > 0) {
     
      dispatch(createNewarrivaltnagar(name, price, description, image, increasedCount,countInStock,code,size,"new arrivals","tnagar"));
    }
   
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>
          <div>
              {/* Button to increase countInStock */}
              <button type="button" className="btn btn-success" onClick={increaseCountInStock}>
                Increase Count
              </button>
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
                          readOnly
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Height</label>
                        <textarea
                          placeholder="Type Height"
                          className="form-control"
                          type="number"
                          
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Width</label>
                        <textarea
                          placeholder="Type width"
                          className="form-control"
                          type="number"
                          
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Size</label>
                        <textarea
                          placeholder="Type width"
                          className="form-control"
                          type="text"
                          
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Product Code</label>
                        <textarea
                          placeholder="Type width"
                          className="form-control"
                          type="text"
                          
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          readOnly
                        ></textarea>
                      </div>
                      {/** 
                      <div className="mb-4">
                        <label className="form-label">
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
                        <label className="form-label">
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
                        <label className="form-label">
                          Price of 10 X 8 Size
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                            className="form-control"
                          id="product_price"
                          required
                          value={price_10X8}
                          onChange={(e) => setPrice10X8(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">
                          Price of 10 X 12 Size
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                            className="form-control"
                          id="product_price"
                          required
                          value={price_10X12}
                          onChange={(e) => setPrice10X12(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">
                          Price of 12 X 15 Size
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                            className="form-control"
                          id="product_price"
                          required
                          value={price_12X15}
                          onChange={(e) => setPrice12X15(e.target.value)}
                        />
                      </div>
                      */}

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

export default EditProductMain_tnagar;
