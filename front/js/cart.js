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
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrices = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // TODO create function UpdateTotals to update total quantities and total price on page using updated information from cards
  // TODO update total quantities on page using updated information from cards
  // TODO update total price on page using updated information from fetch product function
}
// TODO update total quantities on page using updated information from cards
// TODO update total price on page using updated information from fetch product function

insertCartProducts();

// TODO add event listeners to form inputs

function validate() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const nameRGEX = /^[a-zA-Z ]{2,30}$/;
  const addressRGEX = /^[a-zA-Z0-9]*$/;
  const nameResult = nameRGEX.test(firstName);
  const lastNameResult = nameRGEX.test(lastName);
  const addressResult = addressRGEX.test(address);
  const cityResult = addressRGEX.test(city);
  const emailResult = email.includes("@");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  if (nameResult === false) {
    firstNameErrorMsg.innerText = "Please enter a valid first name";
    alert("Please enter a valid first name");
    return false;
  }
  if (lastNameResult === false) {
    lastNameErrorMsg.innerText = "Please enter a valid last name";
    alert("Please enter a valid last name");
    return false;
  }
  if (addressResult === false) {
    addressErrorMsg.innerText = "Please enter a valid address";
    alert("Please enter a valid address");
    return false;
  }
  if (cityResult === false) {
    cityErrorMsg.innerText = "Please enter a valid city";
    alert("Please enter a valid city");
    return false;
  }
  if (emailResult === false) {
    emailErrorMsg.innerText = "Please enter a valid email";
    alert("Please enter a valid email");
    return false;
  }

  return postrequest() && true ? true : false;
}

function postrequest() {
  const cart = getCart();
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  const products = cart.map((item) => item.id);
  const data = { contact, products };
  fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("orderId", data.orderId);
      window.location.href = "confirmation.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// TODO add event listeners to submit button
const submitButton = document.getElementById("submitButton");
if (submitButton) {
  submitButton.addEventListener("click", validate, false);
}
// TODO fetch API post request once the data is validated
// TODO redirect click on submit button to confirmation page
