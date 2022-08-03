//====== Requirements======
// 1) There are two players and each take turns
// 2) when a player clicks submit, the game rolls 2 dices
//3) The player picks the order of the dice they want
// 4) after both player  rolled and chosen their dice order, the player with the higher combined number wins.

//======Problem breakdown and planning ====
// ver 1 : roll 2 dices and output the result for 1 player. Player chooses dice order.
// ver 2 : refractor code to include player 2
//        -global variables for current player; all players scores
//        -refractor out message to interact with each player 1 or 2
//        -write logic for player 1 to go first then player 2 and finally compare scores
// ver 3 : implement comparing dice scores and declare winner.
// ver 4 : reset the same game so that the players can play continually without refreshing the browser page

var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var GAME_STATE_COMPARE_SCORES = "GAME_STATE_COMPARE_SCORES";
var gameState = GAME_STATE_DICE_ROLL;

var currentPlayerRolls = [];
var currentPlayer = 1;
var allPlayerScore = [];

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
    currentPlayerRolls.push(rollDice());
    counter = counter + 1;
  }
  outputMessage1 =
    "Welcome Player " +
    currentPlayer +
    "! <br><br> You rolled <br>Dice One: " +
    currentPlayerRolls[0] +
    " | Dice Two: " +
    currentPlayerRolls[1] +
    "<br><br> Now please input either '1' or '2' to choose the corresponding dice to be used as the first digit of your final value.";

  return outputMessage1;
};

var getPlayerScore = function (playerInput) {
  var playerScore = "";
  //input validation (either 1 or 2 only)
  if (playerInput != 1 || playerInput != 2) {
    outputMessage2 =
      "Error! Please key in '1' or '2' only. <br><br>Your dicerolls are <br>Dice One: " +
      currentPlayerRolls[0] +
      " | Dice Two: " +
      currentPlayerRolls[1] +
      ".";
  }
  if (playerInput == 1) {
    playerScore = Number(
      String(currentPlayerRolls[0]) + String(currentPlayerRolls[1])
    );
    outputMessage2 = "Your chosen value is: " + playerScore + ".";
  }

  if (playerInput == 2) {
    var playerScore = Number(
      String(currentPlayerRolls[1]) + String(currentPlayerRolls[0])
    );
    outputMessage2 = "Your chosen value is: " + playerScore + ".";
  }

  allPlayerScore.push(playerScore);
  currentPlayerRolls = [];

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
  }

  if (currentPlayer == 1 && gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    currentPlayer = 2;
    gameState = GAME_STATE_DICE_ROLL;
    return (
      myOutputValue + "<br></br>It is now Player 2's turn.<br><br>Press submit."
    );
  }

  if (currentPlayer == 2 && gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    gameState = GAME_STATE_COMPARE_SCORES;
    return myOutputValue + "<br></br>Press submit to compare scores!";
  }
  return myOutputValue;
};
