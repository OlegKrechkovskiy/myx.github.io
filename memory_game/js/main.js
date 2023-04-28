/** Эти комменты + файл jsconfig.json в папке со скриптами и VSCode покажет подсказки в виде этих комментариев */

let board = document.querySelector("#board");
let score = document.querySelector("#attemptNumOutput");
let startGameButton = document.querySelector("#startGame");

let gm = new GameManager(board, score);
gm.startGame();

board.addEventListener("click", function (e) {
  let clickedCard = e.target.connectedCard;
  if (clickedCard) {
    gm.SelectCard(clickedCard);
  }
});

startGameButton.addEventListener("click", function () {
  gm.startGame();
});
