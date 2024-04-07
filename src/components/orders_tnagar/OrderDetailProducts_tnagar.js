import React , { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
//import { deliverOrder, paidOrder,markItemAsDelivered,getOrderDetails, markItemAsPaid, markItemAsundelievered, markItemAstobetaken} from "../../Redux/Actions/OrderActions"
import easyinvoice from 'easyinvoice';
import Loading from "../LoadingError/Loading";
import { markItemAsDelivered, markItemAsPaid, markItemAstobetaken, markItemAsundelievered, paidOrder, updatependingbank_tnagar, updatependingcash_tnagar, updatependingupi_tnagar } from "../../Redux/Actions/OrderActions_tnagar";
import { orderMarkTobetaken } from './../../Redux/Reducers/OrderReducres';
import { updatesalesexpensebankupdate, updatesalesexpensecashupdate, updatesalesexpenseupiupdate } from "../../Redux/Actions/ESTActions";
const OrderDetailProducts_tnagar = (props) => {
  const { order, loading } = props;
  const dispatch = useDispatch();
  const products = generateProductArray();
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  const downloadInvoice = () => {
    if (order) 
    {
      const productsArray  = order.orderItems.map((item, index) => ({
        quantity: item.qty,
        description: item.name,
        'unit price': item.price,
        'total price': item.qty * item.price,
        size: `${item.height} X ${item.width}`,
        isDelivered: item.isproductdelivered ? 'Yes' : 'No',
        isPaid: item.isproductpaid ? 'Yes' : 'No',
        deliveredAt: item.isproductdelivered
          ? moment(item.isDeliveredAt).format('MMM Do YY')
          : '',
        paidAt: item.isproductpaid ? moment(item.isPaidAt).format('MMM Do YY') : '',
        // Add other properties based on your item structure
      }));
      console.log(productsArray);
      const data = 
      {
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
        "products": [productsArray.map((item, index) => ({
          "quantity": item.qty,
          "description": item.name,
          "unit price": item.price,
          "total price": item.qty * item.price,
          "size": `${item.height} X ${item.width}`,
          "isDelivered": item.isproductdelivered ? 'Yes' : 'No',
          "isPaid": item.isproductpaid ? 'Yes' : 'No',
          "deliveredAt": item.isproductdelivered
            ? moment(item.isDeliveredAt).format('MMM Do YY')
            : '',
          "paidAt": item.isproductpaid ? moment(item.isPaidAt).format('MMM Do YY') : '',
          // Add other properties based on your item structure
        }))],
        
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
      if (result.pdf) {
        const blob = base64StringToBlob(result.pdf, 'application/pdf');
        const dataUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${order._id}.pdf`;
        a.click();
      } else {
        console.error('Error creating PDF:', result);
      }
    });
    } else {
      console.error('Order data is missing.');
    }
  };


  // Add this function to generate product array
  function generateProductArray() {
    if (order && order.orderItems) {
      return order.orderItems.map((item, index) => ({
        quantity: item.qty,
        description: item.name,
        'unit price': item.price,
        'total price': item.qty * item.price,
        size: `${item.height} X ${item.width}`,
        isDelivered: item.isproductdelivered ? 'Yes' : 'No',
        isPaid: item.isproductpaid ? 'Yes' : 'No',
        deliveredAt: item.isproductdelivered
          ? moment(item.isDeliveredAt).format('MMM Do YY')
          : '',
        paidAt: item.isproductpaid ? moment(item.isPaidAt).format('MMM Do YY') : '',
        // Add other properties based on your item structure
      }));
    }
    return [];
  }




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
const history = useHistory();
 // const orderMarkDelivered = useSelector((state) => state.orderMarkDelivered);
  //const { loading, success, error } = orderMarkDelivered;
  const orderMarkDelivered = useSelector((state) => state.orderMarkDelivered) ; //By using || {}, you ensure that if orderMarkDelivered is undefined, it will default to an empty object. Then, you can destructure loading with a default value of false.
  const { loading: loadingisproductDelivered,success: successproductdelivered } = orderMarkDelivered;
  const orderMarkTobetaken = useSelector((state) => state.orderMarkTobetaken) ; //By using || {}, you ensure that if orderMarkDelivered is undefined, it will default to an empty object. Then, you can destructure loading with a default value of false.
  const { loading: loadingisproducttobetaken,success: successproducttobetaken } = orderMarkTobetaken;

  const orderMarkPaid = useSelector((state) => state.orderMarkPaid) || {}; //By using || {}, you ensure that if orderMarkDelivered is undefined, it will default to an empty object. Then, you can destructure loading with a default value of false.
  const { loading: loadingisproductPaid = false } = orderMarkPaid;

  const orderpaid = useSelector((state) => state.orderpaid);
  const { loading: loadingPay, success: successPay } = orderpaid;

  
  const deliverHandler = (orderId,itemId) => {
 
      dispatch(markItemAsDelivered(orderId, itemId));
    
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    if (order) {
      // Handle toast notifications for order updates
      if (selectedStatus === "toBeTaken") {
        toast.warning("Order status set to 'To Be Taken'", ToastObjects);
      } else if (selectedStatus === "delivered") {
        toast.success("Order delivered successfully", ToastObjects);
      }
    }
  }, [order, selectedStatus]);

  useEffect(() => {
    // This block will be executed whenever orderDetails changes
    // Make sure to handle the updated data appropriately
  }, [orderMarkDelivered]);

  const [pendingcashamt, setpendingCash] = useState("");
  //const [pendingcashacct, setpendingCashacctno] = useState("");
  const [pendingbankamt, setpendingBank] = useState("");
  const [pendingbankacct, setpendingBankacctno] = useState("");
  const [pendingupiamt, setpendingUpi] = useState("");
  const [pendingupiacct, setpendingUpiacctno] = useState("");
  const pendingcash = {
    amount: Number(pendingcashamt),
  };
  const pendingUPI = {
    amount: Number(pendingupiamt),
    acct_no: String(pendingupiacct),
  };
  const pendingBANK = {
    amount: Number(pendingbankamt),
    acct_no: String(pendingbankacct),
  };
  const handlependingcash = async (orderId) => {
    console.log(orderId);
    if((order.pending-pendingbankamt-pendingcashamt-pendingupiamt)>=0)
    {
      dispatch(updatependingcash_tnagar(orderId, pendingcashamt));
      dispatch(updatesalesexpensecashupdate(orderId,pendingcashamt));
    
    }
    else {
      // Display toast message if entered amount is greater than pending amount
      toast.error("Entered amount should be less than or equal to pending amount", ToastObjects);
    }
      //history.push(`/ordert/${orderId}`);
  };
  useEffect(() => {
    if (order.pending - pendingbankamt - pendingcashamt - pendingupiamt < 0) {
      toast.error("Entered amount exceeds pending amount", { autoClose: 2000 });
    }
  }, [order.pending, pendingbankamt, pendingcashamt, pendingupiamt]);
  const handlependingbank = async (orderId) => {
    console.log(orderId);
    if((order.pending-pendingbankamt-pendingcashamt-pendingupiamt)>0)
    {
      dispatch(updatependingbank_tnagar(orderId, pendingbankamt,pendingbankacct));
      dispatch(updatesalesexpensebankupdate(orderId,pendingBANK));
    }
    else {
      // Display toast message if entered amount is greater than pending amount
      toast.error("Entered amount should be less than or equal to pending amount", ToastObjects);
    }
    
  //  history.push(`/ordert/${orderId}`);
  };
  const handlependingupi = async (orderId) => {
    console.log(orderId);
    if((order.pending-pendingbankamt-pendingcashamt-pendingupiamt)>0)
    {
      dispatch(updatependingupi_tnagar(orderId, pendingupiamt,pendingupiacct));
      dispatch(updatesalesexpenseupiupdate(orderId,pendingUPI));
  
    }
    else {
      // Display toast message if entered amount is greater than pending amount
      toast.error("Entered amount should be less than or equal to pending amount", ToastObjects);
    }
        //history.push(`/ordert/${orderId}`);
  };
  const handleStatusChange = async (orderId, itemId) => {
    const selectedProduct = order.orderItems.find((item) => item._id === itemId);
    console.log('handleStatusChange called with', orderId, itemId, selectedStatus);
    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }

    switch (selectedStatus) {
      case 'delivered':
         dispatch(markItemAsDelivered(orderId, itemId));

      //   history.replace(`/ordert/${orderId}`);

        break;
      case 'toBeTaken':
         dispatch(markItemAstobetaken(orderId, itemId));
         console.log("clicked to be taken")
        // history.push(`/ordert/${orderId}`);
       //  dispatch(markItemAsundelievered(orderId, itemId));
        break;
      case 'notDelivered':
         dispatch(markItemAsundelievered(orderId, itemId));
        break;
      default:
    //    history.replace(`/ordert/${orderId}`);
        break;
    }
    setSelectedStatus("");

    // Trigger a refresh after the update
    //forceUpdate({});
  };

  {/** 
  const handleStatusChange = (orderId, itemId) => {
    switch (selectedStatus) {
      case "delivered":
        dispatch(markItemAsDelivered(orderId, itemId));
        break;
      case "toBeTaken":
        dispatch(markItemAstobetaken(orderId,itemId));
        dispatch(markItemAsundelievered(orderId, itemId));
        break;
      case "notDelivered":
        dispatch(markItemAsundelievered(orderId,itemId));

        break;
      default:
        break;
    }
  };
  */}
  const payHandler = (orderId,itemId) => {
 
    dispatch(markItemAsPaid(orderId, itemId));
  
};

  //const deliverHandler = () => {
  //  dispatch(markItemAsDelivered(order));
  //};
  const paidHandler = () => {
    dispatch(paidOrder(order));
    //dispatch(payOrder(orderId));
  };
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  return (
    <>
    <Toast/>
    
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Product</th>
          <th style={{ width: "10%" }}>Unit Price</th>
          <th style={{ width: "10%" }}>Quantity</th>
          <th style={{ width: "10%" }}>Size</th> {/** size update*/}
          <th style={{ width: "10%" }} className="text-end">
            Total
          </th>
          <th style={{ width: "10%" }} className="text-end">
            Delivery status
          </th>

          <th style={{ width: "20%" }} className="text-end">
            Update Delivery status
          </th>
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
            <td>{item.price} </td>
            <td>{item.qty} </td>
            <td>{item.size}</td> {/**size update */}
            <td className="text-end"> ₹{item.qty * item.price}</td>
          
            {/* ... other columns ... */}
            <td>
  <div>
    {!item.isproductdelivered && !item.isproducttobetaken && (
      <span className="btn btn-dark col-12">NOT DELIVERED</span>
    )}
    {item.isproducttobetaken && !item.isproductdelivered &&(
      <span className="btn btn-warning col-12">TO BE TAKEN</span>
    )}
    {item.isproductdelivered && (
      <span className="btn btn-success col-12">
        DELIVERED AT ({moment(item.isDeliveredAt).format("MMM Do YY")})
      </span>
    )}
  </div>
</td>
<td>
  <div className="d-flex flex-column align-items-center">
    <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="form-select mb-2"
    >
      {item.isproductdelivered && (
        <option value="">Select Status</option>
      )}
      {!item.isproductdelivered && !item.isproducttobetaken && (
        <>
          <option value="">Select Status</option>
          <option value="toBeTaken">To Be Taken</option>
          <option value="delivered">Delivered</option>
        </>
      )}
      {item.isproducttobetaken && !item.isproductdelivered && (
        <>
          <option value="">Select Status</option>
          <option value="delivered">Delivered</option>
        </>
      )}
    </select>
    {selectedStatus && item.isproductdelivered ? (
      <button className="btn btn-success mb-2 col-12">
        Delivered AT ({moment(order.isproductdelivered).format("MMM Do YY")})
      </button>
    ) : (
      <>
        {loadingisproductDelivered && <Loading />}
        {loadingisproducttobetaken && <Loading />}
        <button
          onClick={() => handleStatusChange(order._id, item._id)}
          className="btn btn-dark col-12"
        >
          Update
        </button>
      </>
    )}
  </div>
</td>
  </tr>
          
        ))}


        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt> <dd>₹{order.itemsPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt> <dd>₹{order.shippingPrice}</dd>
              </dl>
              <dl className="dlist">
                <dt>Discount :</dt> <dd>₹{order.orderdiscount}</dd>
              </dl>
              <dl className="dlist">
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">₹{order.grandtotal}</b>
                </dd>
              </dl>
              <>
      <dl className="dlist">
        <dt>Pending :</dt>
        <dd>
          {order.pending - pendingbankamt - pendingcashamt - pendingupiamt >= 0 ? (
            <b className="h5">₹{order.pending - pendingbankamt - pendingcashamt - pendingupiamt}</b>
          ) : null}
        </dd>
      </dl>
    </>



             

                
                <dl className="dlist">
                
              {order.cash.amount > 0 && (
  <div>
    <dt>Amount paid with Cash :</dt>
    <dd>
      <b className="h5">₹{order.cash.amount}</b>
    </dd>
  </div>
)}
</dl>
<dl className="dlist">
                
                {order.bank.amount > 0 && (
    <div>
      <dt>Amount paid with Bank :</dt>
      <dd>
        <b className="h5">₹{order.bank.amount}</b>
      </dd>
    </div>
  )}
  </dl>
  <dl className="dlist">
                
                {order.upi.amount > 0 && (
    <div>
      <dt>Amount paid with UPI :</dt>
      <dd>
        <b className="h5">₹{order.upi.amount}</b>
      </dd>
    </div>
  )}
  </dl>
  <dl className="dlist">
  {order.cash_pending.length > 0 && (
    order.cash_pending.map((cashItem, index) => (
      <div key={index}>
        <dt>{`Pending amount paid with cash in term ${index + 1}:`}</dt>
        <dd>
          <b className="h5">₹{cashItem.amount}</b>
          
        </dd>
      </div>
    ))
  )}
</dl>
<dl className="dlist">
  {order.upi_pending.length > 0 && (
    order.upi_pending.map((upiItem, index) => (
      <div key={index}>
        <dt>{`Pending amount paid with UPI in term ${index + 1}:`}</dt>
        <dd>
          <b className="h5">₹{upiItem.amount}</b>
          <span>{` Acct No: ${upiItem.acct_no}`}</span>
        </dd>
      </div>
    ))
  )}
</dl>
<dl className="dlist">
  {order.bank_pending.length > 0 && (
    order.bank_pending.map((bankItem, index) => (
      <div key={index}>
        <dt>{`Pending amount paid with bank in term ${index + 1}:`}</dt>
        <dd>
          <b className="h5">₹{bankItem.amount}</b>
          <span>{` Acct No: ${bankItem.acct_no}`}</span>
        </dd>
      </div>
    ))
  )}
</dl>
{order.pending > 0 && (
  <>
    <dl className="mb-4">
      <label className="form-label">Pending Cash update</label>
      <textarea
        placeholder="Type Height"
        className="form-control"
        required
        value={pendingcashamt}
        onChange={(e) => setpendingCash(e.target.value)}
      ></textarea>
      {loadingPay && <Loading />}
      <button type="button" onClick={() => handlependingcash(order._id)}>
        UPDATE
      </button>
    </dl>
    <dl className="mb-4">
      <label className="form-label">Pending UPI update</label>
      <textarea
        placeholder="Type Height"
        className="form-control"
        required
        value={pendingupiamt}
        onChange={(e) => setpendingUpi(e.target.value)}
      ></textarea>
      <textarea
        placeholder="Type Height"
        className="form-control"
        required
        value={pendingupiacct}
        onChange={(e) => setpendingUpiacctno(e.target.value)}
      ></textarea>
      {loadingPay && <Loading />}
      <button type="button" onClick={() => handlependingupi(order._id)}>
        UPDATE
      </button>
    </dl>
    <dl className="mb-4">
      <label className="form-label">Pending Bank update</label>
      <textarea
        placeholder="Type Height"
        className="form-control"
        required
        value={pendingbankamt}
        onChange={(e) => setpendingBank(e.target.value)}
      ></textarea>
      <textarea
        placeholder="Type Height"
        className="form-control"
        required
        value={pendingbankacct}
        onChange={(e) => setpendingBankacctno(e.target.value)}
      ></textarea>
      {loadingPay && <Loading />}
      <button type="button" onClick={() => handlependingbank(order._id)}>
        UPDATE
      </button>
    </dl>
  </>
)}
           
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
                </dd>
              </dl>

              <dl className="dlist">
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
              </dl>

            </article>
          </td>

        </tr>

      </tbody>
    </table>
    </>
  );
};

export default OrderDetailProducts_tnagar;
