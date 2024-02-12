function getPrice(type) {
    var obj = document.getElementById(type);
    var price = obj.options[obj.selectedIndex].getAttribute("data-price");
    return parseFloat(price);
  }


  function updatePrice() {
    document.getElementById("output").innerHTML = "$" +
        parseFloat((2.49 + getPrice("glazing")) * getPrice("pack")).toFixed(2);

  }

// got help from stackoverflow from annn article that followed a similar price 
// calculation structure