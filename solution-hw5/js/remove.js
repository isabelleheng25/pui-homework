const rollSet = new Set();

let glaze = {
    "Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double Chocolate": 1.5,

};

let pack = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10,
}

class Roll {
    constructor(rollImage, rollType, rollGlazing, packSize, basePrice) {
        this.image = rollImage;
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.calculatedPrice = (this.basePrice + glaze[this.glazing]) * pack[this.size];
    }
  }

function addRoll(rollImage, rollType, rollGlazing, packSize, basePrice) {

    const roll = new Roll(rollImage, rollType, rollGlazing, packSize, basePrice);
    rollSet.add(roll);
    return roll;
}


function updateTotalPrice() {
    let totalPrice = 0;
    rollSet.forEach(roll => {
        totalPrice += parseFloat(roll.calculatedPrice);
    });
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
}


const originalRoll = addRoll(
    "assets/products/original-cinnamon-roll.jpg",
    "Original Cinnamon Roll",
    "Sugar Milk",
    1,
    rolls["Original"]["basePrice"]
);

const walnutRoll = addRoll(
    "assets/products/walnut-cinnamon-roll.jpg",
    "Walnut Cinnamon Roll",
    "Vanilla Milk",
    12,
    rolls["Walnut"]["basePrice"]
);

const raisinRoll = addRoll(
    "assets/products/raisin-cinnamon-roll.jpg",
    "Raisin Cinnamon Roll",
    "Sugar Milk",
    3,
    rolls["Raisin"]["basePrice"]
);

const appleRoll = addRoll(
    "assets/products/apple-cinnamon-roll.jpg",
    "Apple Cinnamon Roll",
    "Original",
    3,
    rolls["Apple"]["basePrice"]
);

for (const roll of rollSet) {
    console.log(roll);
    createElement(roll);
  }

function createElement(roll) {
    const template = document.querySelector('#roll-template');
    const clone = template.content.cloneNode(true);
    roll.element = clone.querySelector('#copy');

    const btnDelete = roll.element.querySelector('#delete');
    btnDelete.addEventListener('click', () => {
        deleteNote(roll);
        updateTotalPrice();
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

    rollImageElement.src = roll.image;
    rollTitleElement.innerText = roll.type;
    rollGlazeElement.innerText = roll.glazing;
    rollPackElement.innerText = "Pack Size: " + roll.size;
    rollPriceElement.innerText = roll.calculatedPrice.toFixed(2);
}

function deleteNote(roll) {
    roll.element.remove();
    rollSet.delete(roll);
}



