
class Sumator {

    constructor(){
 
    }
 
  

    //add price + ----------------------------------
    static addSum(price, totalPrice){
        let getPrice = this.returnPrice(price);
        let summa = +totalPrice.textContent;
        summa += getPrice;
        totalPrice.textContent = summa;
    }
 
    //remove price - ----------------------------------
    static removeSum(price, totalPrice){
       let getPrice = this.returnPrice(price);
       let summa = +totalPrice.textContent;
       summa -= getPrice;
       totalPrice.textContent = summa;
    }

    // get total price ------------------------------------
    static getTotalPrice(result){
        let out = 0;
        cartBuy.forEach(item=>{
            out += +item.price;
        });
 
        result.textContent = out;
    }
 
    //return price elem Regx---------------------
    static returnPrice(price){
       return +price.match(/\d/ig).join('');
    }
 
   
 
 }