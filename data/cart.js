export let cart;

function loadFromLocal(){
  cart = JSON.parse(localStorage.getItem('cart')); 
 

if (!cart){
  cart=[
    {
      ProductId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      Quantity: 0,
      deliveryOptionsId:'1'
    },
    {
      ProductId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      Quantity: 0,
      deliveryOptionsId:'2'
    },
  ]
};
}
loadFromLocal();


export function saveToLocal(){
localStorage.setItem('cart', JSON.stringify(cart));
}


export function addCart(ProductId){
let matchingItem;
  
  cart.forEach((item)=>{
   if(ProductId===item.ProductId){
    matchingItem=item;
   }
});
   // incrase th quantity 
let quantitySelector= document.querySelector(`.js-quantity-${ProductId}`);
let quantityValue=quantitySelector.value;
let quantity=Number(quantityValue);

if(matchingItem){
    matchingItem.Quantity+=quantity;
   }else {
   cart.push({
  ProductId,
  Quantity:quantity,
  deliveryOptionsId:'1'
    });
  }
  saveToLocal();
}

export function updateCart(){
let cartQuantity=0;
  cart.forEach((item)=>{
  cartQuantity+=item.Quantity;
  });
  
 document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
  saveToLocal();
}


export function removeCart(ItemID) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.ProductId !== ItemID) {
      newCart.push(cartItem);
      
    }
 });
 cart=newCart;
 saveToLocal();
}

// export function chekoutItem(){
//     let toatal=0;
//   cart.forEach((ok)=>{
// toatal+=ok.Quantity;
// });
// document.querySelector('.js-item-count').innerHTML=`${toatal} items`;
// saveToLocal();
//   }

  export function updateDelivery(ProductId,deliveryOptionsId){
  let matchingItem;
  
  cart.forEach((item)=>{
   if(ProductId===item.ProductId){
    matchingItem=item;
   }
});
  matchingItem.deliveryOptionsId=deliveryOptionsId
  saveToLocal();
  }

  
  export function loadCart(fun){
    const xhr= new XMLHttpRequest();
    xhr.addEventListener('load',()=>{
      console.log(xhr.response);
      fun();
    });
    xhr.open('GET','https:/supersimplebackend.dev/cart');
    xhr.send();
  }
  


