import React, { useEffect } from "react";
import easyinvoice from 'easyinvoice';


import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  getOrderDetails_tnagar,
  paidOrder,
  
} from "../../Redux/Actions/OrderActions_tnagar";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import OrderDetailInfo_tnagar from './OrderDetailInfo_tnagar';
import OrderDetailProducts_tnagar from "./OrderDetailProducts_tnagar";
import { useHistory } from 'react-router-dom';
const OrderDetailmain_tnagar = (props) => {

 
function downloadinvoice()
{
  var data = {
    // If not using the free version, set your API key
    // "apiKey": "123abc", // Get apiKey through: https://app.budgetinvoice.com/register
    
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": "https://public.budgetinvoice.com/img/logo_en_original.png",
        // The invoice background
      
    },
    // Your own data
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": "12-12-2021",
        // Invoice due date
        "due-date": "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": [
 
    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Kindly pay your invoice within 15 days.",
    // Settings to customize your invoice
    "settings": {
        "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
    },
};
easyinvoice.createInvoice(data, function (result) {
  // The response will contain a base64 encoded PDF file
  if (result.pdf) {
    const blob = base64StringToBlob(result.pdf, 'application/pdf');
    const dataUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${order._id}.pdf`;
    a.click();
  } else {
    console.error('PDF data is missing or invalid.');
  }
});


}
const history=useHistory();
function base64StringToBlob(base64String, mimeType) {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
}

//Create your invoice! Easy!

  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;


  const orderpaid = useSelector((state) => state.orderpaid);
  const { loading: loadingPay, success: successPay } = orderpaid;
  
  useEffect(() => {
    dispatch(getOrderDetails_tnagar(orderId));
  }, [dispatch, orderId, successDelivered,successPay]);
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
 // const invoiceno=order._id.code;
  //console.log(order.code);
  const generateinvoice = () => {
    history.push(`/bill/${order.code}`);
  };
  return (
    <section className="content-main">
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
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Invoice Number: 
                </small>
                <small className="text-white mx-3 ">
                 Billed By: {order.followedby.name}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <button  className="btn btn-success ms-2" onClick={generateinvoice}>
                  <i className="fas fa-print"></i>
                </button>
              </div>
            </div>
          </header>
          
          <div className="card-body">
        
            <OrderDetailInfo_tnagar order={order} />

            <div className="row">
              <div className="col-lg-12">
                <div className="table-responsive">
                  <OrderDetailProducts_tnagar order={order} loading={loading} />
                </div>
              </div>
            
              {/** 
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isDelivered ? (
                    <button className="btn btn-success col-12">
                      DELIVERED AT ({" "}
                      {moment(order.isDeliveredAt).format("MMM Do YY")})
                    </button>
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        MARK AS DELIVERED
                      </button>
                    </>
                  )}
                </div>
                
                <div className="box shadow-sm bg-light">
                  {order.isPaid ? (
                    <button className="btn btn-success col-12">
                      Paid AT ({" "}
                      {moment(order.isPaidAt).format("MMM Do YY")})
                    </button>
                  ) : (
                    <>
                      {loadingPay && <Loading />}
                      <button
                        onClick={paidHandler}
                        className="btn btn-dark col-12"
                      >
                        MARK AS Paid
                      </button>
                    </>
                  )}
                </div>
                
              
              </div>
             */}
            </div>
          
          </div>
         
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain_tnagar;
