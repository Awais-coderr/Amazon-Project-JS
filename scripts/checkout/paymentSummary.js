import { cart } from "../../data/cart.js";
import { getDeliveryOptionId } from "../../data/deliveryOptions.js";
import { getProductId } from "../../data/products.js";

export function renderPymentSummary(){
  let totalPayment=0;
  let taxPayment=0;
  let productQunatity=0;
cart.forEach((cartItem)=>{
  const product=getProductId(cartItem.ProductId)
  totalPayment+=product.priceCents*cartItem.Quantity;
  productQunatity+=cartItem.Quantity
  const deliveryProduct=getDeliveryOptionId(cartItem.deliveryOptionsId);
  taxPayment+=deliveryProduct.priceCents;

});

  const beforeTax= totalPayment+taxPayment;
  const onlyTax=beforeTax*0.1;
  const TotalWithTax=beforeTax+onlyTax;

const PaymentSummary=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${productQunatity}):</div>
            <div class="payment-summary-money">$${totalPayment/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${taxPayment/100}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${beforeTax/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(onlyTax/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(TotalWithTax/100).toFixed(2)}</div>
          </div>
          
          <button class="place-order-button button-primary">
            Place your order
          </button>`;
document.querySelector('.paymentSummary-js').innerHTML=PaymentSummary;
}
