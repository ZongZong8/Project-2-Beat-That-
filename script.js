//====== Requirements======
// 1) There are two players and each take turns
// 2) when a player clicks submit, the game rolls 2 dices
//3) The player picks the order of the dice they want
// 4) after both player  rolled and chosen their dice order, the player with the higher combined number wins.

//======Problem breakdown and planning ====
// ver 1 : roll 2 dices and output the result for 1 player. Player chooses dice order.
// ver 2 : refractor code to include player 2
// ver 3 : implement comparing dice scores and declare winner.
// ver 4 : reset the same game so that the players can play continually without refreshing the browser page

var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_DICE_ROLL;

var playerRolls = [];

var rollDice = function () {
  // Generate a decimal from 0 through 6, inclusive of 0 and exclusive of 6.
  var randomDecimal = Math.random() * 6;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 5 inclusive.
  var randomIntegerLess1 = Math.floor(randomDecimal);

  //This will be an integer from 1 to 6 inclusive.
  var randomInteger = randomIntegerLess1 + 1;

  return randomInteger;
};

var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  outputMessage1 =
    "Welcome! <br><br> You rolled <br>Dice One: " +
    playerRolls[0] +
    " | Dice Two: " +
    playerRolls[1] +
    "<br><br> Now please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.";

  return outputMessage1;
};

var getPlayerScore = function (playerInput) {
  //input validation (either 1 or 2 only)
  if (playerInput != 1 || playerInput != 2) {
    outputMessage2 =
      "Error! Please key in '1' or '2' only. <br><br>Your dicerolls are <br>Dice One: " +
      playerRolls[0] +
      " | Dice Two: " +
      playerRolls[1] +
      ".";
  }
  if (playerInput == 1) {
    var playerScore1 = Number(String(playerRolls[0]) + String(playerRolls[1]));
    outputMessage2 = "Your chosen value is: " + playerScore1 + ".";
  }

  if (playerInput == 2) {
    var playerScore2 = Number(String(playerRolls[1]) + String(playerRolls[0]));
    outputMessage2 = "Your chosen value is: " + playerScore2 + ".";
  }
  return outputMessage2;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameState == GAME_STATE_DICE_ROLL) {
    myOutputValue = rollDiceForPlayer();
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputValue = getPlayerScore(input);
    return myOutputValue;
  }
  return myOutputValue;
};
