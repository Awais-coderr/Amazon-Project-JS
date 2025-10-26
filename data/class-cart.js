class Cart{

cartItems=undefined;
constructor(keyFromLocal){
  this.keyFromLocal=keyFromLocal;
  this.loadFromLocal();
}
loadFromLocal(){
  this.cartItems = JSON.parse(localStorage.getItem(this.keyFromLocal)); 
 
if (!this.cartItems){
  this.cartItems=[
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
};

saveToLocal(){
localStorage.setItem(this.keyFromLocal, JSON.stringify(this.cartItems));
};

addCart(ProductId){
let matchingItem;
  
  this.cartItems.forEach((item)=>{
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
   this.cartItems.push({
  ProductId,
  Quantity:quantity,
  deliveryOptionsId:'1'
    });
  }
  this.saveToLocal();
}

updateCart(){
let cartQuantity=0;
  this.cartItems.forEach((item)=>{
  cartQuantity+=item.Quantity;
  });
  
 document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
  this.saveToLocal();
};

removeCart(ItemID) {
  let newCart = [];
  this.cartItems.forEach((cartItem) => {
    if (cartItem.ProductId !== ItemID) {
      newCart.push(cartItem);
      
    }
 });
 this.cartItems=newCart;
 this.saveToLocal();
};

updateDelivery(ProductId,deliveryOptionsId){
  let matchingItem;
  
  this.cartItems.forEach((item)=>{
   if(ProductId===item.ProductId){
    matchingItem=item;
   }
});
  matchingItem.deliveryOptionsId=deliveryOptionsId
  saveToLocal();
  };
};



const cart=new Cart('opp-cart');
console.log(cart);

const BuinessCart=new Cart('buisness-cart');
console.log(BuinessCart);

// const BuinessCart=new Cart();
// BuinessCart.keyFromLocal='buisness-cart';
// BuinessCart.loadFromLocal();
// console.log(BuinessCart);








 




// export function chekoutItem(){
//     let toatal=0;
//   cart.forEach((ok)=>{
// toatal+=ok.Quantity;
// });
// document.querySelector('.js-item-count').innerHTML=`${toatal} items`;
// saveToLocal();
//   }



  
