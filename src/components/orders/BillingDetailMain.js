import React, { useEffect ,useRef} from "react";
import easyinvoice from 'easyinvoice';
import html2pdf from "html2pdf.js";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getBillDetails_tnagar,
  getOrderDetails_tnagar,
  paidOrder,
  
} from "../../Redux/Actions/OrderActions_tnagar";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const BillingDetailMain = (props) => {
  const componentRef = useRef();
 


//Create your invoice! Easy!

  const { billId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;


  const orderpaid = useSelector((state) => state.orderpaid);
  const { loading: loadingPay, success: successPay } = orderpaid;
  
  useEffect(() => {
    dispatch(getBillDetails_tnagar(billId));
  }, [dispatch, billId, successDelivered,successPay]);
 /* useEffect(() => {
    
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
     
        setSdkReady(true);
      }
    
  }, [dispatch, orderId, successPay, order]);
*/
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const paidHandler = () => {
    dispatch(paidOrder(order));
    //dispatch(payOrder(orderId));
  };


  const downloadPDF = () => {
    const input = componentRef.current;
    if (input) {
      html2pdf().from(input).save(`Invoice ${order._id}.pdf`);
    } else {
      console.error("Component reference not found.");
    }
  };
  return (
    <section className="content-main" >
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card" >
  <div class="invoice"  ref={componentRef}>
    <div class="logo-section">
      <div class="logo">
        
      </div>
      <div class="shop-details">
        <p>Your Shop Name</p>
        <p>Shop Address, City, Country</p>
        <p>Contact: xxx-xxx-xxxx</p>
      </div>
    </div>

    <div class="customer-invoice-section">
      <div class="customer-details">
        <p><strong>Customer Details:</strong></p>
        <p>Name: Customer Name</p>
        <p>Email: customer@example.com</p>
        <p>Phone: xxx-xxx-xxxx</p>
      </div>
      <div class="invoice-details">
        <p><strong>Invoice Details:</strong></p>
        <p>Invoice Number: #123456</p>
        <p>Date: January 1, 2023</p>
        <p>Due Date: January 15, 2023</p>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product 1</td>
          <td>2</td>
          <td>$50.00</td>
          <td>$100.00</td>
        </tr>
        <tr>
          <td>Product 2</td>
          <td>1</td>
          <td>$30.00</td>
          <td>$30.00</td>
        </tr>
      </tbody>
    </table>

    <div class="invoice-total">
      <p><strong>Subtotal:</strong> $130.00</p>
      <p><strong>Tax (10%):</strong> $13.00</p>
      <p><strong>Total:</strong> $143.00</p>
    </div>

    <div class="notes-signature-section">
      <div class="notes">
        <p>Notes:</p>
        <p>Thank you for your business!</p>
      </div>
      <div class="signature">
        <p>_________________________</p>
        <p>Your Signature</p>
      </div>
    </div>
  </div>

          <div className="card-body">
            {/* ... (other body content) */}

    

              {/* Include the bill template here */}
              <div className="col-lg-12 mt-4" >
                <div className="box shadow-sm bg-light">
                  {/* Add a button to download the PDF */}
                  <button className="btn btn-success col-12" onClick={downloadPDF}>
                    Download PDF
                  </button>

                  {/* Include the HTML bill template here */}
                  <div className="bill-container">
                    {/* ... (HTML bill template content) */}
                  </div>
                </div>
              </div>
          
          </div>

        </div>
      )}
    </section>
  );
};

export default BillingDetailMain;
