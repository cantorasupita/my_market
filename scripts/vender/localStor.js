
class LocalStor {

    constructor(){
  
    }

    //saveCart ------------------
    static saveCart(nameLocalStorCart, nameCart){
        localStorage.setItem(nameLocalStorCart, JSON.stringify(nameCart));
    }
     
    //setCart ------------------
    static setCart(nameLocalStorCart){
        return JSON.parse(localStorage.getItem(nameLocalStorCart));
    }


}

