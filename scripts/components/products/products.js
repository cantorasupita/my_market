class Products {

    constructor(){
    
    }



    render(data){

        let cart = data;
        let out = '';

        cart.forEach(item => {
            //console.log(item);
            out += `<div class="col-4">
                <div class="item">
                    <div><a href="#"><img src="img/${item.img}"></a></div>
                    <h4><a href="#">
                        ${item.name}
                        ${item.sale ? '<img class="sale" src="img/SALE.png" alt="скидка">' : ''}
                    </a></h4>
                    <div class="price__gitar"><span>${item.price.toLocaleString()} грн.</span></div>
                    <div class="in__stock-gitar">
                        ${item.InStock ? '<span class="stock_true">В наличии</span>':'<span class="stock_false">Нет в наличии</span>'}
                    </span></div>
                    <div class="buy" data-id=${item.id}>
                            <div class="cartDiv"  style="display:  ${item.check ? 'block': 'none'}">товар в корзине</div>
                            ${item.check ? '': '<button class="but-btn" type="button" data-id=' + item.id +'>купить</button>'}
                    </div>
                </div>
            </div>`;
        }); 
            

        
         
        document.querySelector('.items').innerHTML = out;
    }

}