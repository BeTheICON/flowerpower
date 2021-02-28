const resultsContainer = document.querySelector(".resultsContainer");
const url = "http://betheicon.no/flowerpower/wp-json/wc/store/products/";


async function getProducts() {
    try {
    const response = await fetch(url);
    const products = await response.json();
    console.log(products);
    resultsContainer.innerHTML = "";
    createHTML(products);

         document.querySelector(".sort-dropdown-list").addEventListener("change",function(e){
             console.log(e.target.value);
if(e.target.value.includes("name")){
             products.sort(
                 function(a,b){
                    if(a.name > b.name){
                         return 1;
                    }
                     else if (b.name < a.name){
                     return -1;
                    }
                    else {
                        return 0;
                    }
                }
             );
            }
            if(e.target.value.includes("price")){
                products.sort(
                    function(a,b){
                       if(a.prices.price > b.prices.price){
                            return 1;
                       }
                        else if (b.prices.price < a.prices.price){
                        return -1;
                       }
                       else {
                           return 0;
                       }
                   }
                );
               }


               if(e.target.value.includes("descending")){
                   products.reverse();
               }

            createHTML(products);
         })

}
catch (error) {
    console.log("error occured");
    resultsContainer.innerHTML = errorMessage();
}
}

getProducts();

function createHTML(products){

    resultsContainer.innerHTML = "";


    for (let  i= 0; i < products.length; i++) {

    resultsContainer.innerHTML +=
    `<a href="details.html?id=${products[i].id}" class="product-item">
        <ul class="products-list">
            <li class="product">
                <img class="thumbnail-image" src="${products[i].images[0].thumbnail}" alt="${products[i].images[0].alt}">
                <h2 class="product-title">${products[i].name}</h2>
                <p class="price">${products[i].price_html}</p>
                <div class=short-description><span><i class="far fa-heart" aria-hidden="true"></i> ${products[i].short_description}</span></div>
                <div class="view-more"><a href="${products[i].id}"><button type="submit" class="moreButton"><span><i class="far fa-eye" aria-hidden="true"></i></span> View More</button></a></div>
            <div class="add-to-cart">
                <a href="${products[i].add_to_cart.url}"><button type="submit" class="addToCartButton"> <span>${products[i].add_to_cart.text}</span></a>
            </div>
            </li>
        </ul>
    </a>`;
}
}