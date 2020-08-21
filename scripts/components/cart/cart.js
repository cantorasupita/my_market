class Cart {

    constructor(){
       
    }

    render(cart, cartBuy){
        let out = '';
  

        cartBuy.forEach(item=> {
            cart.forEach(item_2 => {
              if(item.id == item_2.id){
                 out += `
                 <div class="cart__items">
                    <div class="cart__items-item">
                       <div><a href="#"><img src="img/${item_2.img}"></a></div>
                       <div>
                             <h4><a href="#"></a>${item_2.name}</a></h4>
                       </div>
                       <div data-id=${item_2.id}>
                          <button class='plus'>+</button>
                          <span class='item_count'>${item.count}</span>
                          <button class='minus'>-</button>
                       </div>
                       <div class="price__cart"><b>Цена - </b><span>${item_2.price.toLocaleString()} грн.</span></div>
                       <div><button data-id=${item_2.id}  class='btn_delete'>Delete</i></button></div>
                    </div>
                 </div>`;
              }
          });
        });
     
        document.querySelector('.cart_section').innerHTML = out;
    }


    
}