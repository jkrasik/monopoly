var streetMaker = function(name, price, color) {
  this.name = name;
  this.price = price;
  this.color = color;
}


var street = [];

street[0] = new streetMaker("GO");

document.getElementById("cell0").innerHTML = "<div class = 'wrap'>"+ street[0].name + "</div>"
