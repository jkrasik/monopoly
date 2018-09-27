var streetMaker = function(name, price, color) {
  this.name = name;
  this.price = price;
  this.color = color;
  this.owner = null;
}

var playerMaker = function(color, id) {
  this.id = id;
  this.color = color;
  this.budget = 1500;
  this.position = 0;
  this.availableTurns = 0;
}




var square = [];
var player = [];
var gameState = function() {
  this.currentPlayer = 0;
}

square[0] = new streetMaker("GO");
square[1] = new streetMaker("MEDITERRANEAN AVENUE", 60, "BROWN");
square[2] = new streetMaker("COMMUNITY CHEST");
square[3] = new streetMaker("BALTIC AVENUE", 60, "BROWN");
square[4] = new streetMaker("INCOME TAX");
square[5] = new streetMaker("READING RAILROAD", 200);
square[6] = new streetMaker("ORIENTAL AVENUE", 100, "CYAN");
square[7] = new streetMaker("CHANCE");
square[8] = new streetMaker("VERMONT AVENUE", 100, "CYAN");
square[9] = new streetMaker("CONNECTICUT AVENUE", 100, "CYAN");
square[10] = new streetMaker("JUST VISITIN");
square[11] = new streetMaker("ST. CHARLES PLACE", 140, "PURPLE");
square[12] = new streetMaker("ELECTRIC COMPANY", 150);
square[13] = new streetMaker("STATES AVENUE", 140, "PURPLE");
square[14] = new streetMaker("VIRGINIA AVENUE", 160, "PURPLE");
square[15] = new streetMaker("PENSYLVANIA RAILROAD", 200);
square[16] = new streetMaker("ST. JAMES PLACE", 180, "ORANGE");
square[17] = new streetMaker("COMMUNITY CHEST");
square[18] = new streetMaker("TENNESSE AVENUE", 180, "ORANGE");
square[19] = new streetMaker("NEW YORK AVENUE", 200, "ORANGE");
square[20] = new streetMaker("FREE PARKING");
square[21] = new streetMaker("KENTUCKY AVENUE", 220, "RED");
square[22] = new streetMaker("CHANCE");
square[23] = new streetMaker("INDIANA AVENUE", 220, "RED");
square[24] = new streetMaker("ILLINOIS AVENUE", 220, "RED");
square[25] = new streetMaker("B. & O. RAILROAD", 200);
square[26] = new streetMaker("ATLANTIC AVENUE", 260, "YELLOW");
square[27] = new streetMaker("VENTNOR AVENUE", 260, "YELLOW");
square[28] = new streetMaker("WATER WORKS", 150);
square[29] = new streetMaker("MARVIN GARDENS", 280, "YELLOW");
square[30] = new streetMaker("GO TO JAIL");
square[31] = new streetMaker("PACIFIC AVENUE", 300, "GREEN");
square[32] = new streetMaker("NORTH CAROLINA AVENUE", 300, "GREEN");
square[33] = new streetMaker("COMMUNITY CHEST");
square[34] = new streetMaker("PENNSYLVANIA AVENUE", 320, "GREEN");
square[35] = new streetMaker("SHORT LINE", 200);
square[36] = new streetMaker("CHANCE");
square[37] = new streetMaker("PARK PLACE", 350, "BLUE");
square[38] = new streetMaker("LUXURY TAX");
square[39] = new streetMaker("BOARDWALK", 400, "BLUE");

player[0] = new playerMaker("RED", 0);
player[1] = new playerMaker("BLUE", 1);
player[2] = new playerMaker("GREEN", 2);

player[0].availableTurns = 1;


function drawBoard() {
  //draw every board cell
  for(i = 0; i < square.length; i++) {
    //street
    if(square[i].price != undefined) {
      document.getElementById("cell" + i).innerHTML = '<div class = "color" style="background-color: '
      + square[i].color + '"></div>' + square[i].name + '<div class = "playerStanding"></div>' + square[i].price + "$"
      + "<div class = 'owner'></div>";
    }
    //other
    else {
      document.getElementById("cell" + i).innerHTML = square[i].name + '<div class = "playerStanding"></div>';
    }
  }
  //put all the players on start
  for(i = 0; i < player.length; i++) {
  document.getElementById("cell0").querySelector(".playerStanding").innerHTML +=
  "<div class = 'player' id = 'player" + i + "' style = background-color:" + player[i].color + ">" + i + "</div>";
  }
}

function drawStatboard() {
  for(i = 0; i < player.length; i++) {
      document.querySelector(".stats").innerHTML += "<tr><td>" + "placeholder" + "</td><td id=budget" + i + ">"
      + player[i].budget + "</td><td style=background-color:" + player[i].color + "></td></tr>"
  }

}

function changeStatboardBudget(playerNumber){
  document.getElementById("budget" + playerNumber).innerHTML = player[playerNumber].budget;
}



function rollDice() {
  let currentPlayer;
  //check whose turn it is
  for(i = 0; i < player.length; i++) {
    if(player[i].availableTurns == 1){
      currentPlayer = i;
      gameState.currentPlayer = i;
      player[i].availableTurns -=1;
  //player turn ended
      if(i == player.length - 1){
        player[0].availableTurns = 1;
      }
  //next player turn
      else {
      i++;
      player[i].availableTurns = 1;
      }
    }
  }
  //random number from range 2-12
  let numberOfSquares = Math.round(Math.random() * (12 - 2) + 2);
  movePlayer(currentPlayer, numberOfSquares);
}



function movePlayer(playerNumber, numberOfSquares) {
  //remove players from the board
  let current = player[playerNumber];
  for(i = 0; i < player.length; i++) {
    document.getElementById("cell" + player[i].position).querySelector(".playerStanding").innerHTML = "";
  }
  //change position of current player
  current.position += numberOfSquares;
  //if player moves past the start add 200$ to his budget
  if(current.position > 38) {
    current.position -= 39;
    current.budget += 200;
    changeStatboardBudget(playerNumber);
  }
  //draw all the players on board
  for(i = 0; i < player.length; i++) {
    document.getElementById("cell" + player[i].position).querySelector(".playerStanding").innerHTML +=
    "<div class = 'player' id = 'player" + i + "' style = background-color:" + player[i].color + ">" + i + "</div>";
  }

  //taxes
  if(current.position == 4 || current.position == 38){
    current.budget -= 200;
    changeStatboardBudget(playerNumber);
  }

  //community chest
  else if( current.position == 2 || current.position == 17 || current.position == 33){
  }

  //chances
  else if( current.position == 7 || current.position == 22 || current.position == 36){
  }

  //others
  else if( current.position == 0 || current.position == 10 || current.position == 20 || current.position == 30){
  }
  //streets
  else{
    if(square[current.position].owner == null){
      dice.disabled = true;
      buy.disabled = false;
      notBuy.disabled = false;
      showCard(current.position);
    }

    else{

    }
  }
}

function showCard(cardNumber) {
  document.querySelector(".cardShowcase").innerHTML =
  "<tr><td class=cardColor style=background-color:" + square[cardNumber].color + "></td></tr>"
  + "<tr><td class=cardName>" + square[cardNumber].name + "</td></tr>"
  + "<tr><td class=cardPrice>" + square[cardNumber].price + "$" + "</td></tr>";
}

function buyCard(playerNumber) {
  let current = player[playerNumber];

  if(current.budget >= square[current.position].price) {
    current.budget -= square[current.position].price;
    square[current.position].owner = current.id;

    document.getElementById("cell" + current.position).querySelector(".owner").style.backgroundColor = current.color;
    changeStatboardBudget(playerNumber);

    buy.disabled = true;
    notBuy.disabled = true;
    dice.disabled = false;
  }

  else {
    alert("Your budget is too low");
  }
}


drawBoard();
drawStatboard();

const dice = document.querySelector(".dice");
const buy = document.querySelector(".buy");
const notBuy = document.querySelector(".notBuy");

dice.addEventListener('click', rollDice);
buy.addEventListener('click', function(){
  buyCard(gameState.currentPlayer);
});
