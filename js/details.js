const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productContainer = document.querySelector(".productContainer");
const url = "http://betheicon.no/old_files/flowerpower/wp-json/wc/store/products/"+ id;

async function getProductDetails() {
    try {
    const response = await fetch(url);
    const productDetails = await response.json();
    console.log(productDetails);

    productContainer.innerHTML = "";

    createHTML(productDetails);

    document.title = `Flower Power bouquets - ${productDetails.name}`;

    
} catch (error) {
    console.log("error occured");
    productContainer.innerHTML = errorMessage();
}
}
getProductDetails();

function createHTML(productDetails) {
    productContainer.innerHTML =
    `<div class="product-details-container">
        <div class="product-image-container">
            <img class="product-image" src="${productDetails.images[0].thumbnail}" alt="${productDetails.images[0].alt}">
        </div>
        <ul class="product-details-list">
            <li class="product">
                <h2 class="product-title">${productDetails.name}</h2>
                <p class="price">${productDetails.price_html}</p>
                <div class=short-description><span><i class="far fa-heart" aria-hidden="true"></i> ${productDetails.short_description}</span></div>
                <p class="in-stock"><span><i class="fas fa-smile" aria-hidden="true"></i></span> Only ${productDetails.low_stock_remaining} left in stock</p>
                <div class="add-to-cart">
                    <a href="${productDetails.add_to_cart.url}"><button type="submit" class="productDetailsAddToCartButton"> <span>${productDetails.add_to_cart.text}</span></a>
                </div>
                <p class="product-category">Category&#58; ${productDetails.categories[0].name}</p>
                <p class="product-tags">Tags&#58; ${productDetails.tags[0].name}, ${productDetails.tags[1].name}, ${productDetails.tags[2].name}</p>
            </li>
        </ul>
    </div>
    <div class="description-container">
        <div class="description"><span>Description&#58; ${productDetails.description}</span>
        </div>
    `;
}
