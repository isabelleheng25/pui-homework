const rollSet = new Set();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
  }

function addRoll(rollType, rollGlazing, packSize, basePrice) {
    const roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    rollSet.add(roll);
    updateTotalPrice();
    return roll;
}


function updateTotalPrice() {
    let totalPrice = 0;
    rollSet.forEach(roll => {
        totalPrice += parseFloat(roll.basePrice);
    });
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
}


function createElement(roll) {
    const template = document.querySelector('#roll-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('#copy');

    const btnDelete = roll.element.querySelector('#delete');
    btnDelete.addEventListener('click', () => {
        deleteNote(roll);
        updateTotalPrice();
        saveToLocalStorage();
        updateCount();
    });
  
    const rollListElement = document.querySelector('.page');
    rollListElement.append(roll.element);

    updateElement(roll);
}

function updateElement(roll) {
    const rollImageElement = roll.element.querySelector('.image');
	const rollTitleElement = roll.element.querySelector('.roll-type');
	const rollGlazeElement = roll.element.querySelector('.glaze');
    const rollPackElement = roll.element.querySelector('.pack');
    const rollPriceElement = roll.element.querySelector('.price');

    rollImageElement.src = '../assets/products/' + rolls[roll.type]["imageFile"];
    rollTitleElement.innerText = roll.type + " Cinnamon Roll";
    rollGlazeElement.innerText = roll.glazing;
    rollPackElement.innerText = "Pack Size: " + roll.size;
    rollPriceElement.innerText = "$" + roll.basePrice.toFixed(2);
    // roll.calculatedPrice.toFixed(2);
}

function deleteNote(roll) {
    roll.element.remove();
    rollSet.delete(roll);
}

function retrieveFromLocalStorage() {
    const cartArrayString = localStorage.getItem('storedRolls');
    const cartArray = JSON.parse(cartArrayString);
    console.log(cartArray);
  
    for (const rollData of cartArray) {
      const roll = addRoll(rollData.type, rollData.glazing,
        rollData.size, rollData.basePrice);
      createElement(roll);
    }

    updateTotalPrice();
    updateCount();
}
  
if (localStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
} else{
    let rollSet = new Set();
}

function saveToLocalStorage() {
    const cartArray = Array.from(rollSet);
    console.log(cartArray);
  
    const cartArrayString = JSON.stringify(cartArray);
    console.log(cartArrayString);
  
    localStorage.setItem('storedRolls', cartArrayString);
}

function updateCount() {
    const icon = document.querySelector('.count');
    icon.innerText = rollSet.size;
}