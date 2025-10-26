export const deliveryOptions=[
  {
    id:'1',
    priceCents:0,
    deliveryDays:7
  },
  {
    id:'2',
    priceCents:499,
    deliveryDays:3
  },
   {
    id:'3',
    priceCents:999,
    deliveryDays:1
  }
]

export function getDeliveryOptionId(cartDelivery){
let matchingDelivery;
deliveryOptions.forEach((option)=>{
  if(option.id===cartDelivery){
    matchingDelivery=option;
  }
});
return matchingDelivery;
}

export function calculateDeliveryDate(deliveryOption){
    if(deliveryOption.format('dddd')==='Saturday'){
     return deliveryOption.add(2,'days');
    }else if(deliveryOption.format('dddd')==='Sunday'){
    return deliveryOption.add(1,'days');
    }
    return deliveryOption;
  }

  
 