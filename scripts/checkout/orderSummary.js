import { cart,removeCart/*chekoutItem*/,saveToLocal,updateDelivery } from "../../data/cart.js";
import { products,getProductId } from "../../data/products.js";
import { deliveryOptions,getDeliveryOptionId,calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";


export function renderOrderSummary(){
let html='';

cart.forEach((item)=>{
  let cartId=item.ProductId;
  let matchingCart=getProductId(cartId);

const cartDelivery=item.deliveryOptionsId;
let matchingDelivery=getDeliveryOptionId(cartDelivery);
// const today= dayjs();
//     const deliveryDate=today.add(matchingDelivery.deliveryDays,'days');
//     const confirmDate=deliveryDate.format('dddd, MMMM D')
     const today=dayjs();
  const deliveryDate=today.add(matchingDelivery.deliveryDays,'days');
  const adjustedDate = calculateDeliveryDate(deliveryDate);


  html+= `<div class="cart-item-container cart-item-js-${matchingCart.id}">
            <div class="delivery-date">
              ${adjustedDate.format('dddd, MMMM D')}

            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingCart.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingCart.name}
                </div>
                <div class="product-price">
                  $${(matchingCart.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">

                  <span>
                    Quantity: <span class="quantity-label quantity-label-${matchingCart.id}">${item.Quantity}</span>
                   </span>

                  <span class="update-quantity-link link-primary js-update" data-update-id="${matchingCart.id}">
                    Update
                  </span>

              

                  <input class="input-quantity js-input-quantity-${matchingCart.id}">
                  <span class="save-link link-primary js-link-save" data-save-id="${matchingCart.id}">Save</span>



                  <span class="delete-quantity-link link-primary delete-js " data-item-id="${matchingCart.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               
                
                ${Delivery(matchingCart,item)}
              </div>
            </div>
          </div>`;

});


 function Delivery(matchingCart,item){
  let deliveryHTML='';
deliveryOptions.forEach((delivery)=>{
     



    const today=dayjs();
  const deliveryDate=today.add(delivery.deliveryDays,'days');
  const adjustedDate = calculateDeliveryDate(deliveryDate);

    const confirmPrice= delivery.priceCents===0 ?'FREE - ':`${(delivery.priceCents/100).toFixed(2)} - `
    const isCheked= delivery.id===item.deliveryOptionsId;

    deliveryHTML+=`<div class="delivery-option js-delivery" data-pr-id="${matchingCart.id}" data-de-id="${delivery.id}">
                  <input type="radio" ${isCheked ?'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-1-${matchingCart.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${adjustedDate.format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      $${confirmPrice}Shipping
                    </div>
                  </div>
              </div>`
  });
 return deliveryHTML;
 }
   
   

document.querySelector('.js-order').innerHTML=html;
document.querySelectorAll('.delete-js')
  .forEach((del) => {
    del.addEventListener('click', () => {
      let ItemID = del.dataset.itemId;
     removeCart(ItemID)
     const Delete=document.querySelector(`.cart-item-js-${ItemID}`);
   Delete.remove();
  //  chekoutItem();
   renderPymentSummary();
   renderCheckoutHeader();
  });
  });
//  chekoutItem();


document.querySelectorAll('.js-update')
.forEach((update)=>{
 update.addEventListener('click',()=>{
 const updateID=update.dataset.updateId;
 const UPDATE=document.querySelector(`.cart-item-js-${updateID}`);
 UPDATE.classList.add('isEditing');
 renderPymentSummary();
 renderCheckoutHeader();
 });
});


document.querySelectorAll('.js-link-save')
.forEach((save)=>{
save.addEventListener('click',()=>{
  const saveID=save.dataset.saveId;
  const SAVE=document.querySelector(`.cart-item-js-${saveID}`);
  SAVE.classList.remove('isEditing');
  const inputQuantity=document.querySelector(`.js-input-quantity-${saveID}`);
  inputQuantity.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const input = Number(inputQuantity.value);
  // document.querySelector(`.quantity-label-${saveID}`).innerHTML=input;
  cart.forEach((item)=>{
  if(item.ProductId===saveID){
    item.Quantity=input;
  }
  });
    document.querySelector(`.quantity-label-${saveID}`).innerHTML = input;
  // Save to local storage and update the cart
  saveToLocal();
      }
    });
  const input = Number(inputQuantity.value);
  // document.querySelector(`.quantity-label-${saveID}`).innerHTML=input;
  cart.forEach((item)=>{
  if(item.ProductId===saveID){
    item.Quantity=input;
  }
  });
    document.querySelector(`.quantity-label-${saveID}`).innerHTML = input;
  // Save to local storage and update the cart
  saveToLocal();
  renderPymentSummary();
  renderCheckoutHeader();
})
});


document.querySelectorAll('.js-delivery')
.forEach((delivery)=>{
delivery.addEventListener('click',()=>{
  const ProductId= delivery.dataset.prId;
  const deliveryOptionsId=delivery.dataset.deId;
updateDelivery(ProductId,deliveryOptionsId);
renderOrderSummary();
renderPymentSummary();
renderCheckoutHeader();
});
});
}



 
  
  




