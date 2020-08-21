
let cart = '';
let cartBuy = '';


//localstorage-----------------------------------------


if(LocalStor.setCart('cart') != null){
   cartBuy = LocalStor.setCart('cart');
}else {
   cartBuy = [];
}





//----------------------------------------------------------


let cartIcon = document.querySelector('.cart');
let modalCart = document.querySelector('.modal__cart');
let modalClose = document.querySelector('.modal_close');
let cartSuma = document.querySelector('.modal__cart .cart__suma');

let items = document.querySelector('.items');
let cart_section = document.querySelector('.cart_section');
let cartCount = document.querySelector('.cart > span');

//filter-----------------------------------------
let check_Sale = document.querySelector('.saleCheck');
let min_max = document.querySelector('.minMax__price');
let max_min = document.querySelector('.maxMin__price');

//----------------------------------------------------------










let cartClass = new Cart();
let productClass =  new Products();


//sumator ---------------------------------------------------------
Sumator.getTotalPrice(cartSuma);


//countCart() -------------
//==================================================================
function countCart(){
   return cartCount.innerHTML = cartBuy.length;
}

//sumator
//===============================================================






//add item
//--------------------------------------------------------
items.addEventListener('click', function(e){
  
   //add cartBuy ------------------------------------------
   if(e.target.className === 'but-btn'){

      //SUMATOR---------------------------------------------------------------------------------------
      let getElemPrice =  e.target.parentNode.parentNode.children[2].textContent;
      //sumator --------------------------------------------------------
      Sumator.addSum(getElemPrice, cartSuma);
     

      //formation cartBuy--------------------------------- 
      cartBuy.push({id : e.target.dataset.id, count: 1, display: true, price: Sumator.returnPrice(getElemPrice)});

      e.target.previousSibling.previousSibling.style.display = "block"
      e.target.remove();





      //save Cart----------------------------------
      LocalStor.saveCart('cart', cartBuy);

      //save mutate state Cart --------------------------------------------
      //------------------------
      cart.forEach(item =>{
         if(e.target.dataset.id == item.id){
               item.check = true;
         }
      });






      countCart();//count item for cartBuy
      
   }
   console.log(cart);
});









//cart
//===================================================
cart_section.addEventListener('click', function(e){


   //plus count-----------------------------------------------------
   if(e.target.className === 'plus'){

      let count = +e.target.nextElementSibling.textContent;
      count++;
      e.target.nextElementSibling.textContent = count;
      
      let dataId = e.target.parentNode.dataset.id

      cartBuy.forEach(item=>{
         if(item.id == dataId){
            item.count++;
            LocalStor.saveCart('cart', cartBuy);//-----------------------
         }
      });

   //end
   }


   //minus count --------------------------------------------------
   if(e.target.className === 'minus'){

      let count = +e.target.previousElementSibling.textContent;
      count--;
      if(count < 1){
         e.target.previousElementSibling.textContent = 1;
      }else{
         e.target.previousElementSibling.textContent = count;
      }
      //--------------------------
      let dataId = e.target.parentNode.dataset.id
      //----------------------------
      cartBuy.forEach(item=>{
         if(item.id == dataId){
            if(count < 1){
               item.count = 1;
               LocalStor.saveCart('cart', cartBuy);
            }else{
               item.count--;
               LocalStor.saveCart('cart', cartBuy);
            }
            
         }
      });
    //end  
   }


   //delete-------------------------------------------------------------
   if(e.target.className === 'btn_delete'){
     
      //delete cartBuy  and delete item ----------------------
      cartBuy.forEach((item , i, arr)=>{

         //cartBuy.id === btn.id
         if(item.id == e.target.dataset.id){
               //-------------------------------------------------------
               arr.splice(i, 1);





               // save cartBuy-----------------------------
               LocalStor.saveCart('cart', cartBuy);
               //save mutate state Cart --------------------------------------------
               //------------------------
               cart.forEach(item =>{
                  if(e.target.dataset.id == item.id){
                        item.check = false;
                  }
               });




               e.target.parentNode.parentNode.remove();//delete item Cart

               //SUMATOR----------------------------------------------------------------------------------------
               let getElemPrice =  e.target.parentNode.previousElementSibling.textContent;
               Sumator.removeSum(getElemPrice, cartSuma);
               
               //add but-btn --------------------------  
               items.childNodes.forEach(item_2=>{
                  let dataId = item_2.childNodes[1].childNodes[9].dataset.id; //id items
                  
                  if(item.id == dataId){
                        item_2.childNodes[1].childNodes[9].innerHTML = `
                        <div class="cartDiv"  style="display:  ${item.check ? 'block': 'none'}">товар в корзине</div>
                        <button class="but-btn" type="button" data-id=${dataId}>купить</button>`;
                  }
               });
         }
      //end
      });

      countCart();//count item for cartBuy
   //end
   }



   
//---------------------------------------------------------
//end --------------------------------------------------------
});



//fetch========================
//====================================================================
fetch('goods.json')
    .then(resolve => resolve.json())
    .then( data => {
      let arrMod = '';

   
      function getFuncCart(){

         if(cartBuy.length == 0){  // если catBuy == 0
            cart = data.items.map(item=> {
               item.check = false;
               return item;
            });
         } else { // иначе -------------

         cart = data.items.map(item=> {
                  item.check = false;
                  return item;
               }).map(item=>{
                  cartBuy.forEach(it=>{
                     if(it.id == item.id){
                        item.check = true;
                     }
                  });
               return item;
            });

         }
      }
      getFuncCart();

      productClass.render(cart); // render cart
      modal();//modal popup
      countCart();//count item for cartBuy

      //filter
      //=============================================================================


      //sale  -----------------------------------------------------------
      check_Sale.addEventListener('change', function(){

         let cartClon = cart.map(item=>item);

         if(this.checked){
            let saleCart = cartClon.filter(item=>item.sale);
            productClass.render(saleCart);
         }else{
            productClass.render(cart);
         }

      //END-------------------
      });



      //min_max Price ---------------------------------------------------
      min_max.addEventListener('change', function(){

         let cartClon = cart.map(item=>item);

         if(this.checked){
            let saleCart = cartClon.sort((a,b)=> a.price - b.price);
            productClass.render(saleCart);
         }else{
            productClass.render(cart);
         }

      //END-------------------
      });



      //min_max Price -----------------------------------------------------
      max_min.addEventListener('change', function(){

         let cartClon = cart.map(item=>item);

            if(this.checked){
               let saleCart = cartClon.sort((a,b)=> b.price - a.price);
               productClass.render(saleCart);
            }else{
               productClass.render(cart);
            }

         //END-------------------   
      });




   //===========================================================================================
});






