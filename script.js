let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let new_button = document.querySelector("#new_button");
let msg_container = document.querySelector(".msg_container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msg_container.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "o";
      box.style.color = "rgba(255, 128, 10)";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "rgba(143, 37, 12)";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      drawGame();
    }
    checkWinner();
  });
});

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, winner is : ${winner}`;
  msg_container.classList.remove("hide");
  disableBoxes();
};
const drawGame = () => {
  msg.innerText = `Game is Draw`;
  msg_container.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("winner is:", pos1Val);
        showWinner(pos1Val);
      }
    }
  }
};

new_button.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
