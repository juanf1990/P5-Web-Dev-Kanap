/*
 * Get selected product ID in Product page
 */

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productID = urlParams.get("id");

console.log(productID);

const productHolder = document.querySelector(".item");
/*
 * Get API product for selected product
 */

// fetch(`http://localhost:3000/api/products/${productID}`)
//   .then((product) => {
//     return product.json();
//   })
//   .then((product) => {
//     insertProduct(product);
//   });
let h1 = document.querySelector("#title");
let p = document.querySelector("#description");
let img = document.querySelector(".item__img > img");
let price = document.querySelector("#price");
let colors = document.querySelector("#colors");
let quantity = document.querySelector("")
async function displayProducts() {
  let url = `http://localhost:3000/api/products/${productID}`;
  let response = await fetch(url);
  const product = await response.json();
  console.log(product);
  // title

  h1.textContent = product.name;
  // description

  p.textContent = product.description;
  // image

  img.src = product.imageUrl;
  // price

  price.textContent = product.price;
  // colors

  let option = document.createElement("option");
  product.colors.forEach((color) => {
    option.textContent = color;
    colors.appendChild(option);
  });
}

let submitButton = document.querySelector("#addToCart");
submitButton.addEventListener("click", addToCart);

let test = [];

function addToCart() {
  localStorage.setItem("ID", productID);
  localStorage.setItem("PRODUCT", h1.textContent);
  localStorage.setItem("PRICE", price.textContent);
  localStorage.setItem("QUANTITY", )
  test.push(productID);
  test.push(h1.textContent);
  console.log(test);
}

displayProducts();

/*
 * Find element to insert product details
 */

/*
 * Create function to add product elements into the holder
 */

// function insertProduct(product) {
//   const productElement = document.createElement("article");

// //   productElement.innerHTML = `
// //           <div class="item__img">
// //             <img src="${product.imageUrl}" alt="${product.altTxt}">
// //           </div>
// //           <div class="item__content">

// //             <div class="item__content__titlePrice">
// //               <h1 id="title">${product.name}</h1>
// //               <p>Prix : <span id="price">${product.price}</span>€</p>
// //             </div>

// //             <div class="item__content__description">
// //               <p class="item__content__description__title">Description:</p>
// //               <p id="description">${product.description}</p>
// //             </div>

// //             <div class="item__content__settings">
// //               <div class="item__content__settings__color">
// //                 <label for="color-select">Chose your color:</label>
// //                 <select name="color-select" id="colors">
// //                     <option value="">--Please, select a color --</option>
// //                     <option>${c}</option>
// //                 </select>

// //               </div>
// //               <div class="item__content__settings__quantity">
// //                 <label for="itemQuantity">Number of articles (1-100):</label>
// //                 <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
// //               </div>
// //             </div>

// //             <div class="item__content__addButton">
// //               <button id="addToCart">Add to cart</button>
// //             </div>
// //           </div>
// //         `;
// //         productHolder.appendChild(productElement);
// // }

// TODO Create option tags using for loop from product.colors array and append them one by one to the select tag

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
