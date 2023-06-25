import axios from 'axios';
const Axios = axios.create({
    baseURL: 'https://ecommerceserver-wyky.onrender.com/',
  });
  
  export default Axios;