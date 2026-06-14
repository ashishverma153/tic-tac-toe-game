let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
let turnIndicator = document.querySelector("#turn-indicator");

let turnO = true; // true = O's turn, false = X's turn

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
];

const updateTurnIndicator = () => {
    turnIndicator.textContent = `Player ${turnO ? "O" : "X"}'s turn`;
    turnIndicator.style.color = turnO ? "#60a5fa" : "#f472b6";
};

const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win-highlight", "o", "x");
    });
    msgContainer.classList.add("hide");
    msgContainer.classList.remove("draw");
    updateTurnIndicator();
};

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const showWinner = (winner, pattern) => {
    msg.innerText = `🏆 Congratulations! ${winner} wins!`;
    msgContainer.classList.remove("hide", "draw");
    pattern.forEach((idx) => boxes[idx].classList.add("win-highlight"));
    disableBoxes();
    turnIndicator.textContent = "";
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;
        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1, pattern);
            return;
        }
    }
    // Check for a draw
    const allFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allFilled) {
        msg.innerText = "🤝 It's a Draw!";
        msgContainer.classList.remove("hide");
        msgContainer.classList.add("draw");
        disableBoxes();
        turnIndicator.textContent = "";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;
        updateTurnIndicator();
        checkWinner();
    });
});

resetBtn.addEventListener("click", resetGame);

// Initialize the indicator on first load
updateTurnIndicator();
