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

async function displayProducts() {
  const url = `http://localhost:3000/api/products/${productID}`;
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
  if (cartArray.length === 0 || !cartArray.find((item) => item.id === cartItem.id && item.color === cartItem.color)) {
    cartArray.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartArray));
  } else if (cartArray.length > 0 && cartArray.some((item) => item.id === cartItem.id && item.color === cartItem.color)) {
    cartArray.forEach((item) => {
      if (item.id === cartItem.id && item.color === cartItem.color) {
        item.quantity += cartItem.quantity;
      } else {
        cartArray.push(cartItem);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cartArray));
  } else {
    cartArray.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cartArray));
  }
}
displayProducts();



  // TODO Check first if the product array has a product with the same color, then increase quantity

  // cartArray.push(cartItem);
  // localStorage.setItem("cart", JSON.stringify(cartArray));
  // console.log(cartArray);

// JSON stringify (convert object to string) and JSON parse (convert from string to object);

// localStorage.setItem("cartUpdate", JSON.stringify(cardArray(object)));

// const cartItem = {
//   id: "7321731273",
//   color: "blue",
//   quantity: 1,
// };

// const sampleCart = [cartItem];

// console.log(sampleCart);
// console.log(JSON.stringify(sampleCart));

/* <option value="">--Please, select a color --</option>
<!--                       <option value="vert">green</option>
  <option value="blanc">white</option> -->

//   <option value="">--Please, select a color --</option>
//   <!--                       <option value="vert">green</option>
//     <option value="blanc">white</option> -->
// <option>White</option>
*/
