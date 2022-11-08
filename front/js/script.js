console.log("I'm a loaded script, ready to serve you!");

// Fetch data from API

fetch("http://localhost:3000/api/products")
  .then((data) => {
    return data.json();
  })
  .then((products) => {
    insertProducts(products);
  });
// Get element on HTML where to insert the cards

const cardHolder = document.getElementById("items");

// Iterate over the information that came from API (ARRAY OF PRODUCTS)

function insertProducts(products) {
  for (let i = 0; i < products.length; i++) {
    // Get current element in the array
    const product = products[i];
    // Create new card DOM element which will be inserted on the page
    const productElement = document.createElement("a");
    productElement.setAttribute("href", `./product.html?id=${product._id}`);
    productElement.innerHTML = `
        <article>
          <img
            class="productImage"
            src='${product.imageUrl}'
            alt="${product.altTxt}"
          />
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
    `;
    cardHolder.appendChild(productElement);
  }
}
