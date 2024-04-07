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
import { saveShippingAddress } from './../../Redux/Actions/cartActions';

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

  //console.log(order.followedby.name);
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
      html2pdf().from(input).toPdf().get('pdf').then(function (pdf) {
        // Open the browser's print dialog
        pdf.autoPrint();
  
        // Save and print the PDF
        pdf.save(`Invoice ${order.code}.pdf`);
      });
    } else {
      console.error("Component reference not found.");
    }
  };

  {/*const downloadPDF = () => {
    const input = componentRef.current;
    if (input) {
      html2pdf().from(input).save(`Invoice ${order.code}.pdf`);
    } else {
      console.error("Component reference not found.");
    }
  };*/}
  return (
<section className="content-main">
  <div className="content-header">

    <Link to={`/ordert/${order._id}`} className="btn btn-dark text-white">
    Back To Bills
  </Link>
  </div>

  {loading ? (
    <Loading />
  ) : error ? (
    <Message variant="alert-danger">{error}</Message>
  ) : (
    <div className="card">
      <div className="invoice" ref={componentRef}>
        <div className="logo-section">
          <div className="logo">
            <img src="/images/Balaji_logo.jpeg" alt="Logo" width="100%" />
          </div>
          <div className="shop-details">
            <p><strong>Hyderabad Branch</strong></p>
            <p><strong>Phone:</strong> 9894225555</p>
            <p><strong>Address:</strong> H.No.2-52/1/1, Pillar No.1727, HItech city main road, Madhapur, Hyderabad- 81</p>
            <p><strong>Website:</strong> www.balajitanjoreartgallery.com</p>
            <p><strong>Tollfree Number:</strong> +91 6383884488</p>
          </div>
        </div>

        <div className="customer-invoice-section">
          <div className="customer-details">
            <p><strong>Bill To:</strong></p>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalcode}, {order.shippingAddress.country}</p>
          </div>
          <div className="invoice-details">
            <p><strong>Invoice Details:</strong></p>
            <p><strong>Invoice Number: </strong>{order.code}</p>
            <p><strong>Invoice Date:</strong> {moment(order.createdAt).format("MMM Do YY")}</p>
            {order.orderItems.every(item => item.isproductdelivered) ? (
              <p><strong>Delivery Date:</strong> {moment(order.isproductdelivered).format("MMM Do YY")}</p>
            ) : (
              <p><strong>Delivery Date: </strong>To be delivered</p>
            )}
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link className="itemside" to="#">
                    <div className="info">{item.name}</div>
                  </Link>
                </td>
                <td>{item.size}</td> {/**size update */}
                <td>{item.qty}</td>
                <td className="text-end">₹{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <p><strong>Subtotal:</strong> ₹{order.totalPrice - order.taxPrice}</p>
          <p><strong>GST:</strong> ₹{order.taxPrice}</p>
          <p><strong>Discount:</strong> ₹{order.orderdiscount}</p>
          <p><strong>Grand Total:</strong> ₹{order.grandtotal}</p>
        </div>

        <div className="notes-signature-section">
          <div className="notes">
            <p><strong>Notes:</strong></p>
            <p>{order.Notes}</p>
          </div>
          <div className="signature">
           <p><strong>Followed By:</strong> {order.followedby.name}</p>
           

          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="col-lg-12 mt-4">
          <div className="box shadow-sm bg-light">
            <button className="btn btn-success col-12" onClick={downloadPDF}>
              Download PDF
            </button>
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
