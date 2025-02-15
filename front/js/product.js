/*
 * Get selected product ID in Product page
 */

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productID = urlParams.get("id");

console.log(productID);

/*
 * Find element to insert product details
 */

const productHolder = document.querySelector(".item");
const h1 = document.querySelector("#title");
const p = document.querySelector("#description");
const img = document.querySelector(".item__img");
const price = document.querySelector("#price");
const colors = document.querySelector("#colors");
const quantity = document.getElementById("quantity");

/*
 * Get API product for selected product
 */

async function displayCartProducts() {
  const url = `https://p5-web-dev-kanap-production.up.railway.app/api/products/${productID}`;
  const response = await fetch(url);
  const product = await response.json();
  console.log(product);

  // title

  h1.innerText = product.name;

  // description

  p.innerText = product.description;

  // image

  img.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  // price

  price.innerText = product.price;

  // colors

  let option = document.createElement("option");
  product.colors.forEach((color) => {
    colors.innerHTML += `<option value="${color}">${color}</option>`;
  });
}

/*
 * Event Listener on Submit button to save data on Local Storage
 */

let submitButton = document.querySelector("#addToCart");
submitButton.addEventListener("click", addToCart);

function addToCart() {
  const cartArray = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItem = {
    id: productID,
    color: colors.value,
    quantity: parseInt(quantity.value),
  };
  if (
    cartArray.length === 0 ||
    !cartArray.find(
      (item) => item.id === cartItem.id && item.color === cartItem.color
    )
  ) {
    cartArray.push(cartItem);
  } else if (
    cartArray.length > 0 &&
    cartArray.some(
      (item) => item.id === cartItem.id && item.color === cartItem.color
    )
  ) {
    cartArray.forEach((item) => {
      if (item.id === cartItem.id && item.color === cartItem.color) {
        item.quantity += cartItem.quantity;
      }
    });
  } else {
    cartArray.push(cartItem);
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
}
displayCartProducts();
