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
import { editProducttnagar, updateProducttnagar } from "../../Redux/Actions/ProductActionst";
import { editAboutus, updateAboutus } from "../../Redux/Actions/AboutusActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditAboutusMain = (props) => {
  const { aboutusId } = props;

  
  

  const [description, setDescription] = useState("");

  {/** 
  const [price_11X11,setPrice11X11]=useState(0);
  const [price_15X12,setPrice15X12]=useState(0);  
  const [price_10X8,setPrice10X8]=useState(0);
  const [price_10X12,setPrice10X12]=useState(0);
  const [price_12X15,setPrice12X15]=useState(0);
  */}

  const dispatch = useDispatch();

  const aboutusEdit = useSelector((state) => state.aboutusEdit);
  const { loading, error, aboutus } = aboutusEdit;

  const aboutusUpdate = useSelector((state) => state.aboutusUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = aboutusUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (aboutus._id === aboutusId) {
        dispatch(editAboutus(aboutusId));
      } else {

        setDescription(aboutus.description);


     
        {/** 
        setPrice11X11(product.price_11X11);
        setPrice15X12(product.price_15X12);
        setPrice10X8(product.price_10X8);
        setPrice10X12(product.price_10X12);
        setPrice12X15(product.price_12X15);
        */}
      }
    }
  }, [aboutus, dispatch, aboutusId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAboutus({
        _id: aboutusId,

        description,

      })
    );
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
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
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

export default EditAboutusMain;
