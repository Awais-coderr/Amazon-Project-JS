export let Cart=JSON.parse(localStorage.getItem('Cart'));
if(!Cart) {
 Cart= [{
    Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity:2,
  },{
  Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  Quantity:1
  }
];
}
function saveToStorage(){
  localStorage.setItem('Cart',JSON.stringify(Cart));
};

export function addToCart(Id){
    let matchingItem;
   Cart.forEach((item)=>{
       if(Id===item.Id){
        matchingItem=item
       }
   });
   if(matchingItem){
    matchingItem.Quantity++;
   } else{
    Cart.push({
  Id,
  Quantity:1
});
   }
   saveToStorage();
   }
 export function removeCart(productId){
  let newCart=[];
    Cart.forEach((cartItem)=>{
  if(cartItem.Id!==productId){
    newCart.push(cartItem);
  }
    });
    Cart=newCart;
    saveToStorage();
   }