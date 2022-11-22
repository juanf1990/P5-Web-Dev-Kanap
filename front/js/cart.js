/* fetch DATA from API */
async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return products;
}

/* Get DATA from Local Storage */

function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  return cart;
}

getCart();

function deleteItem(event) {
    event.target.closest('article').remove();
    /* TODO: Find closest article tag element and remove it from the DOM */
    /* TODO: Remove item from local storage */
    console.log("delete");
}

function changeQuantity(event) {
    /* TODO: Find closest article tag element and get color and ID from the data tags (Element.dataset Element.dataset https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) */
    /* TODO: Find the item in the cart from the localstorage and update the quantity */
    console.log("change");
}

/* FIXME: duplicate products in cart */
/* TODO: Update total quantity on the bottom of the page */
/* TODO: Update total price on the bottom of the page */



/* Display DATA on HTML */
const productsContainer = document.getElementById("cart__items");

async function insertCartProducts() {
    await fetchProducts().then((products) => {
        const cart = getCart();
        if (cart) {
            cart.forEach((cartItem) => {
                /* TODO: Add event listener to delete button and change quantity */
                console.log(cartItem);
                const product = products.find((product) => (product._id === cartItem.id) );
                console.log(product);
                productsContainer.innerHTML += `
                <article class="cart__item" data-id="${product._id}" data-color="${cartItem.color}">
                    <div class="cart__item__img">
                     <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${product.name}</h3>
                            <p>${cartItem.color}</p>
                            <p>€${product.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings_quantity">
                                <p>Quantity : ${cartItem.quantity}</p>
                                <input type="number" class="itemQuantity" name="itemQuantity "min="1" max="100" value="${cartItem.quantity}">
                            </div>
                            <div class="cart__item__content__settings_delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                        </div>
                    </div>
                </article>
                `;
            });
        }
    });
}

insertCartProducts();

// const removeItem = document.querySelector(".deleteItem");
// removeItem.addEventListener("click", "removeItem");



    //   products.forEach((product) => {
    //     const productElement = document.createElement("article");
    //     productElement.classList.add("cart__item");
    //     productElement.setAttribute("data-id", product._id);
    //     productElement.setAttribute("data-color", product.color);
    //     productElement.innerHTML += `
    //             <div class="cart__item_img">
    //                 <img src="${product.imageUrl}" alt="${product.altTxt}">
    //             </div>
    //             <div class="cart__item__content">
    //                 <div class="cart__item__content__description">
    //                     <h2>${product.name}</h3>
    //                     <p>${product.color}</p>
    //                     <p>€${product.price}</p>
    //                 </div>
    //             </div>
    //             <div class="cart__item__content__settings">
    //                 <div class="cart__item__content__settings_quantity">
    //                     <p>Quantity : ${product.quantity}</p>
    //                     <input type="number" class="itemQuantity" name="itemQuantity "min="1" max="100" value="${product.quantity}">
    //                 </div>
    //                 <div class="cart__item__content__settings_delete">
    //                     <p class="deleteItem>Delete</p>
    //                 </div>
    //             </div>
    //         `;