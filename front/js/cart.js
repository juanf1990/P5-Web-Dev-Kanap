// fetch DATA from API
async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  return products;
}

// Get cart from localStorage
function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  return cart;
}

// Display DATA on HTML
const submitButton = document.getElementById("order");
const productsContainer = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");

// Handle clicks on delete button
async function insertCartProducts() {
  await fetchProducts().then((products) => {
    const cart = getCart();
    if (cart) {
      cart.forEach((cartItem) => {
        console.log(cartItem);
        const product = products.find((product) => product._id === cartItem.id);
        console.log(product);
        const articleElement = document.createElement("article");
        // Generates a div for an article
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
                            <div class="cart__item__content__settings__quantity">
                                <p>Quantity : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity "min="1" max="100" value="${cartItem.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Delete</p>
                            </div>
                        </div>
                    </div>
                `;
        articleElement.classList.add("cart__item");
        articleElement.dataset.id = product._id;
        articleElement.dataset.color = cartItem.color;

        function updateTotals() {
          const parsedCart = JSON.parse(localStorage.getItem("cart"));
          const currentTotalQuantity = parsedCart.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          const currentTotalPrice = parsedCart.reduce(
            (acc, item) => acc + item.quantity * product.price,
            0
          );
          totalQuantity.innerText = currentTotalQuantity;
          totalPrice.innerText = currentTotalPrice;
        }

        articleElement
          .querySelector(".deleteItem")
          .addEventListener("click", handleDelete);

        function handleDelete(e) {
          const articleElement = e.target.closest("article");
          const id = articleElement.dataset.id;
          const color = articleElement.dataset.color;
          articleElement.remove();
          removeItemFromLocalStorage(id, color);
          updateTotals();
        }

        articleElement
          .querySelector(".itemQuantity")
          .addEventListener("change", handleQuantityChange);

        function handleQuantityChange(e) {
          const articleElement = e.target.closest("article");
          const id = articleElement.dataset.id;
          const color = articleElement.dataset.color;
          const quantity = parseInt(e.target.value);
          const cart = getCart();
          const result = cart.find(
            (item) => item.id === id && item.color === color
          );
          result.quantity = quantity;
          const stringifiedCart = JSON.stringify(cart);
          localStorage.setItem("cart", stringifiedCart);
          updateTotals();
        }

        productsContainer.appendChild(articleElement);
        updateTotals();
      });
    }
  });
}

// Remove item from local storage.
function removeItemFromLocalStorage(id, color) {
  const cart = getCart();
  const filteredCart = cart.filter(
    (item) => !(item.id === id && item.color === color)
  );
  const stringifiedCart = JSON.stringify(filteredCart);
  localStorage.setItem("cart", stringifiedCart);
}

insertCartProducts();

// Validates an input form
function validate() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const email = document.getElementById("email").value;
  const nameRegEx = /^[a-zA-Z ]{2,30}$/;
  const addressRegEx = /^[a-zA-Z0-9]{1}$/;
  const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const nameResult = nameRegEx.test(firstName);
  const lastNameResult = nameRegEx.test(lastName);
  const addressResult = addressRegEx.test(address);
  const cityResult = addressRegEx.test(city);
  const emailResult = emailRegEx.test(email);
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  if (nameResult === false) {
    firstNameErrorMsg.innerText = "Please enter a valid first name";
    return;
  }
  if (lastNameResult === false) {
    lastNameErrorMsg.innerText = "Please enter a valid last name";
    return;
  }
  if (addressResult === false) {
    addressErrorMsg.innerText = "Please enter a valid address";
    return;
  }
  if (cityResult === false) {
    cityErrorMsg.innerText = "Please enter a valid city";
    return;
  }
  if (emailResult === false) {
    emailErrorMsg.innerText = "Please enter a valid email";
    return;
  }

  postrequest();
  console.log("validated");
}

// Create a new order
function postrequest() {
  const contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  const products = [];
  const cart = getCart();
  cart.forEach((item) => {
    products.push(item.id);
  });
  const order = { contact, products };
  console.log("post", order);

  console.log("post", products);

  try {
    fetch(
      "http://localhost:3000/api/products/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      },
      console.log("post", order)
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html" + "?id=" + data.orderId;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.log(error);
  }
}

// Adds a click event listener to the order element
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
});
