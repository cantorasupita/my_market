


function modal(){

    cartIcon.addEventListener('click', function(){
       modalCart.style.display = 'block';
       cartClass.render(cart, cartBuy);
 
    });
    
    
    modalClose.addEventListener('click', function(){
       modalCart.style.display = 'none';
    });
    
    
    
    modalCart.addEventListener('click', function(e){
       if(e.target.className == 'modal__cart'){
          modalCart.style.display = 'none';
       }
    });
    
 }
 