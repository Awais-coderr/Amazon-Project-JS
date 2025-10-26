import { Cart,removeCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencySet } from "./utils/utils.js";
let matcingCart;
let FullCart='';
Cart.forEach((cartProduct)=>{
let CartID=cartProduct.Id;
products.forEach((product)=>{
if(product.id===CartID){
matcingCart=product;
FullCart+= ` <div class="cart-item-container cart-item-js-${matcingCart.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matcingCart.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matcingCart.name}
                </div>
                <div class="product-price">
                  ${currencySet(matcingCart.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">2</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-js " data-cart-id="${matcingCart.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="${matcingCart.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matcingCart.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="${matcingCart.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`

}
});
}
);
const ok=document.querySelector('.order-summary-js').innerHTML=FullCart;

document.querySelectorAll('.delete-js')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.cartId;
    
    removeCart(productId);
  let cartContainer=document.querySelector(`.cart-item-js-${productId}`);
   cartContainer.remove();
  });
});


