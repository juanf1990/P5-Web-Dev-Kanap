const orderID = document.getElementById("orderId");
const queryString = window.location.search;
const urlParm = queryString.split("id=")[1];

orderID.innerText = urlParm;
