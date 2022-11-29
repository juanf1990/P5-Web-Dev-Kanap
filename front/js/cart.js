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
/* TODO: Find closest article tag element and remove it from the DOM */
/* TODO: Remove item from local storage */

/* TODO: Find closest article tag element and get color and ID from the data tags (Element.dataset Element.dataset https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) */
/* TODO: Find the item in the cart from the localstorage and update the quantity */

/* TODO: Update total quantity on the bottom of the page */

/* TODO: Update total price on the bottom of the page */

/* Display DATA on HTML */
const productsContainer = document.getElementById("cart__items");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");

// Handle clicks on delete button
function handleDelete(e) {
  const articleElement = e.target.closest("article");
  const id = articleElement.dataset.id;
  articleElement.remove();
  removeItem(id);
// TODO Update total quantity from 

  // }
}

// handle clicks on the quantity input
productsContainer.onchange = function (e) {
  if (e.target && e.target.classList.contains("itemQuantity")) {
    const id = e.target.dataset.id; // get the id from the data-id attribute
    const color = e.target.dataset.color; // get the color from the data-color attribute
    if (e.target.value <= 0) {
      removeItem(id);
    }
    if (e.target.value > 0) {
      updateItem(id, color, e.target.value);
    }
  }
};

async function insertCartProducts() {
  await fetchProducts().then((products) => {
    const cart = getCart();
    if (cart) {
      cart.forEach((cartItem) => {
        /* TODO: Add event listener to delete button and change quantity */
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
                                <p>Quantity : ${cartItem.quantity}</p>
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
          // TODO add event listener to quantity input

        productsContainer.appendChild(articleElement);
        // TODO update total quantity and total price
            const currentTotalQuantity = parseInt(totalQuantity.innerText || 0);
            totalQuantity.innerText = currentTotalQuantity + cartItem.quantity;
      });
    }
  });
}

function removeItem(id) {
  const cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      // TODO remove item from local storage
        cart.splice(i, 1);
    }
  }
    // TODO update total quantities on page using updated information from cards
    // TODO update total price on page using updated information from fetch product function
    // TODO update local storage using localStorage.setItem("cart", JSON.stringify(cart));
    // 
}

function updateItem(id, color, quantity) {
  const cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id && cart[i].color === color) {
      cart[i].quantity = quantity;
    }
    if (cart[i].quantity < 1) {
      cart.splice(i, 1);
    }
    if (cart[i].quantity > 100) {
      cart[i].quantity = 100;
    }
    if (cart[i].quantity < 1) {
      cart[i].quantity = 1;
    }
  }
}

insertCartProducts();
