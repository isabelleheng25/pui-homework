const rollSet = new Set();

class Roll {
    constructor(rollImage, rollType, rollGlazing, packSize, calculatedPrice) {
        this.image = rollImage;
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.calculatedPrice = calculatedPrice;
    }
  }

function addRoll(rollImage, rollType, rollGlazing, packSize, calculatedPrice) {
    const roll = new Roll(rollImage, rollType, rollGlazing, packSize, calculatedPrice);
    rollSet.add(roll);
    return roll;
}


function updateTotalPrice() {
    let totalPrice = 0;
    rollSet.forEach(roll => {
        totalPrice += parseFloat(roll.calculatedPrice.replace('$', ''));
    });
    document.getElementById('total-price').textContent = '$' + totalPrice.toFixed(2);
}


const originalRoll = addRoll(
    "assets/products/original-cinnamon-roll.jpg",
    "Original Cinnamon Roll",
    "Sugar Milk",
    "Pack Size: 1",
    "$2.49"
);

const walnutRoll = addRoll(
    "assets/products/walnut-cinnamon-roll.jpg",
    "Walnut Cinnamon Roll",
    "Vanilla Milk",
    "Pack Size: 12",
    "$39.90"
);

const raisinRoll = addRoll(
    "assets/products/raisin-cinnamon-roll.jpg",
    "Raisin Cinnamon Roll",
    "Sugar Milk",
    "Pack Size: 3",
    "$8.97"
);

const appleRoll = addRoll(
    "assets/products/apple-cinnamon-roll.jpg",
    "Apple Cinnamon Roll",
    "Original",
    "Pack Size: 3",
    "$10.47"
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
    rollPackElement.innerText = roll.size;
    rollPriceElement.innerText = roll.calculatedPrice;
}

function deleteNote(roll) {
    roll.element.remove();
    rollSet.delete(roll);
}



