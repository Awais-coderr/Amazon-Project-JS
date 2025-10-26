import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProductsFetch,loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/class-cart.js';
// import '../data/backend-cart.js'

Promise.all([
  loadProductsFetch(),
new Promise((resolve)=>{
    loadCart(()=>{
  resolve();
    });
  }).then(()=>{
    
    renderCheckoutHeader();
    renderOrderSummary();
    renderPymentSummary();
  })
])


// new Promise((resolve)=>{
//   console.log('start loading')
//  loadProducts(()=>{
//   console.log('in progress')
//    resolve();
//  });
// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//   resolve();
//     });
//   });
 
// }).then(()=>{
//  console.log('finish loading');
//   renderCheckoutHeader();
// renderOrderSummary();
// renderPymentSummary();
//   });

// loadProducts(()=>{
// renderCheckoutHeader();
// renderOrderSummary();
// renderPymentSummary();

// });
