/*
 * Get selected product ID in Product page
 */

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const productID = urlParams.get("id");

console.log(productID);

/*
 * Get API data for selected product
 */

fetch(`http://localhost:3000/api/products/${productID}`)
  .then((data) => {
    return data.json();
  })
  .then((product) => {
    insertProduct(product);
  });

/*
 * Find element to insert product details
 */

const productHolder = document.querySelector(".item");

/*
 * Create function to add product elements into the holder
 */

function insertProduct(product) {
  const productElement = document.createElement("article");
  productElement.innerHTML = `
          <div class="item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="item__content">

            <div class="item__content__titlePrice">
              <h1 id="title">${product.name}</h1>
              <p>Prix : <span id="price">${product.price}</span>€</p>
            </div>

            <div class="item__content__description">
              <p class="item__content__description__title">Description:</p>
              <p id="description">${product.description}</p>
            </div>

            <div class="item__content__settings">
              <div class="item__content__settings__color">
                <label for="color-select">Chose your color:</label>
                <select name="color-select" id="colors">
                    <option value="">--Please, select a color --</option>
                    
                </select>
              </div>    
              <div class="item__content__settings__quantity">
                <label for="itemQuantity">Number of articles (1-100):</label>
                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
              </div>
            </div>

            <div class="item__content__addButton">
              <button id="addToCart">Add to cart</button>
            </div>
          </div>
        `;

  // TODO Create option tags using for loop from product.colors array and append them one by one to the select tag

  productHolder.appendChild(productElement);
}

// JSON stringify (convert object to string) and JSON parse (convert from string to object);
// localStorage.setItem("cartUpdate", JSON.stringify(cardArray(object)));

const cartItem = {
  id: "7321731273",
  color: "blue",
  quantity: 1,
};

const sampleCart = [cartItem];

console.log(sampleCart);
console.log(JSON.stringify(sampleCart));