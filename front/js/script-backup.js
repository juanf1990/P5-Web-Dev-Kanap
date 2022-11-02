// /**
//  * Display message in console
//  *
//  * @param {string} message - The message to display
//  */
// function display(message) {
//   console.log(message);
// }
// display("This is a test");

// fetch('http://localhost:3000/api/products') {}
// .then(data => {
//   return data.json();
// })
// .then(posts => {
//   console.log(post.title);
// });

// const container = document.querySelector("#container");

// const sectionCard = document.querySelector("#items");

// const productTitle = document.querySelector(".productName");
// productTitle.innerHtml = "Hola";

// const productImage = document.querySelector(".productImage");
// productImage.src = "/back/images/kanap01.jpeg";

// const productDescription = document.querySelector(".productDescription");
// productDescription.textContent = "Description...";

// async function displayProducts() {
//   let url = "http://localhost:3000/api/products";
//   let response = await fetch(url);
//   const data = await response.json();
//   console.log(data);
//   return data;
// }

// displayProducts();

// async function setTitle() {
//   let data = await displayProducts();
//   let titleElement = document.querySelector(".productName");
//   console.log(titleElement);
//   productTitle.textContent = data[0].name;
// }

// setTitle();

// async function setImage() {
//   let data = await displayProducts();
//   productImage.src = data[0].imageUrl;
// }

// setImage();

// async function setDescription() {
//   let data = await displayProducts();
//   productDescription.textContent = data[0].description;
// }

// setDescription();

// async function setCard() {
//   let data = await displayProducts();
//   for (let i = 0; i < data.length; i++) {
//     let section = document.createElement("p");
//     section.setAttribute("id", "items");
//     section.textContent = data[i].name + data[i].description;
//     container.appendChild(section);
//   }
// }
// setCard();

async function insertCards() {
    // TODO insert card for each product
    // TODO find element where cards should be inserted
    //  const holderElement = document.getElementById('items')
    // let data = await displayProducts();
    for (let i = 0; i < data.length; i++) {
      const card = cards[i];
      console.log(card);
      // TODO insert the product card for the product item thats currently iterating
      const cardElement = document.createElement('card');
      cardElement.setAttribute('id', 'card');
      cardElement.classList.add('card');
      // TODO insertCard function (which should return the string of the html)
      // TODO concatenate the HTML strings one by one for the holderElement
      //      holderElement.innerHTML += templated string for innerCard function.
  
      productTitle.textContent = data[i].name;
      productDescription.textContent = data[i].description;
    }
  }
  // TODO create a new function insertCard data[i] note: check setCard function
  // TODO create a templated string (img, title, description) use '`'. placeholder for each of the items required.
  
  insertCards();
  
  // function demo() {
  //   const holderElement = document.getElementById('items');
  //   console.log(holderElement);
  //   console.log(holderElement.innerHTML);
  //   holderElement.innerHTML += `
  //   <a href="./product.html?id=42">
  //             <article>
  //               <img
  //                 class="productImage"
  //                 src="/back/images/kanap01.jpeg"
  //                 alt="Lorem ipsum dolor sit amet, Kanap name1"
  //               />
  //               <h3>${data.name}</h3>
  //               <p>${data.description}</p>
  //             </article>
  //           </a>
  //   `
  //   console.log(holderElement.innerHTML);
    
  // }
  
  // demo();
  