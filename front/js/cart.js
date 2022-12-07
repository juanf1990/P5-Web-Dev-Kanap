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

/* TODO: Find closest article tag element and get color and ID from the data tags (Element.dataset Element.dataset https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) */
/* TODO: Find the item in the cart from the localstorage and update the quantity */

/* FIXME: Update total quantity on the bottom of the page */

/* TODO: Update total price on the bottom of the page */

/* Display DATA on HTML */
const productsContainer = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

// Handle clicks on delete button
function handleDelete(e) {
  const articleElement = e.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  articleElement.remove();
  removeItemFromLocalStorage(id, color);
}

async function insertCartProducts() {
  await fetchProducts().then((products) => {
    const cart = getCart();
    if (cart) {
      cart.forEach((cartItem) => {
        console.log(cartItem);
        const product = products.find((product) => product._id === cartItem.id);
        console.log(product);
        const articleElement = document.createElement("article");
        articleElement.innerHTML = `
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
                                <p>Quantity : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity "min="1" max="100" value="${cartItem.quantity}">
                            </div>
                            <div class="cart__item__content__settings_delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                        </div>
                    </div>
                `;
        articleElement.classList.add("cart__item");
        articleElement.dataset.id = product._id;
        articleElement.dataset.color = cartItem.color;

        articleElement
          .querySelector(".deleteItem")
          .addEventListener("click", handleDelete);

        articleElement
          .querySelector(".itemQuantity")
          .addEventListener("change", handleQuantityChange);

        productsContainer.appendChild(articleElement);
        // TODO update total quantity and total price
        const currentTotalQuantity = parseInt(totalQuantity.innerText || 0);
        totalQuantity.innerText = currentTotalQuantity + cartItem.quantity;
      });
    }
  });
}

function removeItemFromLocalStorage(id, color) {
  const cart = getCart();
  const filteredCart = cart.filter(
    (item) => !(item.id === id && item.color === color)
  );
  const stringifiedCart = JSON.stringify(filteredCart);
  localStorage.setItem("cart", stringifiedCart);
  // TODO update total quantities on page using updated information from cards
  // TODO update total price on page using updated information from fetch product function
}

function handleQuantityChange(e) {
  const articleElement = e.target.closest("article");
  const id = articleElement.dataset.id;
  const color = articleElement.dataset.color;
  const quantity = parseInt(e.target.value);
  const cart = getCart();
  const result = cart.find((item) => item.id === id && item.color === color);
  result.quantity = quantity;
  const stringifiedCart = JSON.stringify(cart);
  localStorage.setItem("cart", stringifiedCart);
  // TODO create function UpdateTotals to update total quantities and total price on page using updated information from cards
  // TODO update total quantities on page using updated information from cards
  // TODO update total price on page using updated information from fetch product function
}

insertCartProducts();

// TODO add event listener for form inputs
// TODO add event listener to submit button
// TODO fetch API post request once the data is validated
// TODO redirect to confirmation page
