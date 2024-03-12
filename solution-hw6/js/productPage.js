function getPrice(type) {
  var obj = document.getElementById(type);
  var price = obj.options[obj.selectedIndex].getAttribute("data-price");
  return parseFloat(price);
}


function updatePrice() {
  document.getElementById("output").innerHTML = "$" +
      parseFloat((rolls[rollType]["basePrice"] + getPrice("glazing")) * getPrice("pack")).toFixed(2);

}

// got help from stackoverflow from annn article that followed a similar price 
// calculation structure

const rollSet = new Set();

// cart = [];
console.log(rolls);

const queryString = window.location.search;
console.log(queryString);

const params = new URLSearchParams(queryString);
console.log(params);

const rollType = params.get("roll");
console.log(rollType);





function saveToLocalStorage() {
  const cartArray = Array.from(rollSet);
  console.log(cartArray);

  const cartArrayString = JSON.stringify(cartArray);
  console.log(cartArrayString);

  localStorage.setItem('storedRolls', cartArrayString);
}

function retrieveFromLocalStorage() {
  const cartArrayString = localStorage.getItem('storedRolls');
  const cartArray = JSON.parse(cartArrayString);
  
  for(const roll of cartArray) {
    rollSet.add(roll);
  }

  updateCount();

}

if (localStorage.getItem('storedRolls') != null) {
  retrieveFromLocalStorage();
}

function updateCount() {
  const icon = document.querySelector('.count');
  icon.innerText = rollSet.size;
}








// Update the header text
let headerElement = document.querySelector('#product');
headerElement.innerText = rollType + ' Cinnamon Roll'; 
console.log(headerElement)

// Update the image
let rollImage = document.querySelector('#roll-img');
rollImage.src = '../assets/products/' + rolls[rollType]["imageFile"];
console.log(rollImage)


// Update the price
let rollPrice = document.querySelector('#output');
rollPrice.innerText = '$' + rolls[rollType]["basePrice"];
console.log(rollPrice)


class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

function add() {
  // Get selected values from dropdown menus
  const rollType = params.get("roll");
  const rollGlazing = document.getElementById('glazing').value;
  const packSize = document.getElementById('pack').value;
  const basePrice = parseFloat(document.getElementById('output').textContent.substring(1));

  // Create a new instance of Roll
  const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
  
  // Add the new instance to the cart array
  rollSet.add(newRoll);

  saveToLocalStorage();
  updateCount();
}





