import { products,loadProducts } from "../data/products.js";
import { cart,addCart,updateCart } from "../data/cart.js";

loadProducts(renderGridProduct);
export function renderGridProduct(){
  

updateCart();
let AllProducts='';
products.forEach((product)=>{
AllProducts+=`
<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container ">
            <select class=" js-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
 
          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addCart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
`
});
// Whole view of cart grid
document.querySelector('.js-grid-container').innerHTML=AllProducts;
// when you click to add cart
let ok;
document.querySelectorAll('.js-addCart')
.forEach((button)=>{
button.addEventListener('click',()=>{
  const ProductId=button.dataset.productId;
// chek if item already there so just update the quantity

 
  let addButton = document.querySelector(`.js-added-${ProductId}`);
   if(addButton.classList.contains('added-to-cart-visible')){
  addButton.classList.remove('added-to-cart-visible');
  
   } else{
    addButton.classList.add('added-to-cart-visible');
    
   }

   addCart(ProductId);
  updateCart();
  
});

});


}
