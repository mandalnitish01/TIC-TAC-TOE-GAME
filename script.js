const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const winner = document.querySelector("#input");

let currentplayer;
let gamegrid;

const winningPossition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initgame() {
  currentplayer = "X";
  gamegrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });

  gameinfo.innerText = `Current Player - ${currentplayer}`;
  newGameBtn.classList.remove("active");
}
initgame();

function SwapTurn() {
    newGameBtn.classList.add("active");
  if (currentplayer === "X") {
    currentplayer = "0";
  } else {
    currentplayer = "X";
  }
  gameinfo.innerText = `Current Player - ${currentplayer}`;
}

function CheckGameOver() {
  // newGameBtn.classList.add("active");
  let answer = "";
  winningPossition.forEach((position) => {
    //This logic is showing our all three position have non empty value and each value are same in nature.
    if (
      (gamegrid[position[0]] !== "" ||
        gamegrid[position[1]] !== "" ||
        gamegrid[position[2]]) &&
      gamegrid[position[0]] === gamegrid[position[1]] &&
      gamegrid[position[1]] === gamegrid[position[2]]
    ) {
      if (gamegrid[position[0]] === "X") answer = "X";
      else answer = "0";

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");

      confetti({
        particleCount: 1000,
        spread: 70,
        origin: { y: 0.6 },
      });

    }
  });

  if (answer !== "") {
    gameinfo.innerText = `Winner player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  let fillCount = 0;
  gamegrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    gameinfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}
function HandleClick(index) {
  if (gamegrid[index] === "") {
    boxes[index].innerText = currentplayer;
    gamegrid[index] = currentplayer;
    boxes[index].style.pointerEvents = "none";
    //swap Turn
    SwapTurn();
    // Check game is over

    CheckGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    HandleClick(index);
  });
});

newGameBtn.addEventListener("click", initgame);
