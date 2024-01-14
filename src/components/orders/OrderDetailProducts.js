import React , { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deliverOrder, paidOrder,markItemAsDelivered,getOrderDetails, markItemAsPaid, markItemAsundelievered, markItemAstobetaken} from "../../Redux/Actions/OrderActions"
import easyinvoice from 'easyinvoice';
import Loading from "../LoadingError/Loading";
const OrderDetailProducts = (props) => {
  const { order, loading } = props;
  const dispatch = useDispatch();
  const products = generateProductArray();
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
 // const orderMarkDelivered = useSelector((state) => state.orderMarkDelivered);
  //const { loading, success, error } = orderMarkDelivered;
  const orderMarkDelivered = useSelector((state) => state.orderMarkDelivered) || {}; //By using || {}, you ensure that if orderMarkDelivered is undefined, it will default to an empty object. Then, you can destructure loading with a default value of false.
  const { loading: loadingisproductDelivered = false } = orderMarkDelivered;

  const orderMarkPaid = useSelector((state) => state.orderMarkPaid) || {}; //By using || {}, you ensure that if orderMarkDelivered is undefined, it will default to an empty object. Then, you can destructure loading with a default value of false.
  const { loading: loadingisproductPaid = false } = orderMarkPaid;
  
  const deliverHandler = (orderId,itemId) => {
 
      dispatch(markItemAsDelivered(orderId, itemId));
    
  };
  const [selectedStatus, setSelectedStatus] = useState("");
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
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "20%" }}>Product</th>
          <th style={{ width: "10%" }}>Unit Price</th>
          <th style={{ width: "10%" }}>Quantity</th>
          <th style={{ width: "10%" }}>Size</th> {/** size update*/}
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
          <th style={{ width: "20%" }} className="text-end">
            Delivery status
          </th>
          <th style={{ width: "20%" }} className="text-end">
            Delivery status option
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
            <td>{item.height} X {item.width}</td> {/**size update */}
            <td className="text-end"> ₹{item.qty * item.price}</td>
            <tr key={index}>
            {/* ... other columns ... */}


            </tr>
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
                <dt>Grand total:</dt>
                <dd>
                  <b className="h5">₹{order.totalPrice}</b>
                </dd>
              </dl>
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
            </article>
          </td>
          <button  className="btn btn-success ms-2" onClick={downloadInvoice}>
                  <i className="fas fa-print"></i>
                </button>
                <Link to="/billing" className="btn btn-dark text-white">
          Back To Orders
        </Link>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
