
// players

const player = (playerName, playerNumber) => {
console.log(playerName + playerNumber)
return {playerName, playerNumber}

}

// game system

const gameFlow = (() => {
    // 1 = p1 turn, 2 = p2 turn, 0 = game over
    let turnOrder = 1,
    playerOne,
    playerTwo,
    arrY = ["top", "mid", "bottom"],
    arrX = ["left", "mid", "right"],
    valueY,
    valueX,
    isTie = 0,
    gridSquaresObj = [],
    gameBoardBase = document.getElementById("gameBoardContainer"),
    playerOneName = document.getElementById("player1Name"),
    playerTwoName = document.getElementById("player2Name"),
    gameInfoCont = document.querySelector(".gameInfoContainer"),
    resetBtn = document.querySelector(".resetBtn"),
    pvpBtn = document.querySelector(".pvpBtn"),
    CPUBtn = document.querySelector(".CPUBtn"),
    submitBtn = document.querySelector(".submitBtn"),
    playerNamesForm = document.getElementById("playerNames");
    initialize();

    resetBtn.addEventListener("click", initialize);
    pvpBtn.addEventListener("click", gameModePvp);
    CPUBtn.addEventListener("click", gameModeCPU);
    submitBtn.addEventListener("click", submitNames);

    function initialize() {
        gameInfoCont.textContent = "Select Game Mode";
        pvpBtn.style.display = "block";
        CPUBtn.style.display = "block";
        playerNamesForm.style.display = "none";
        submitBtn.style.display = "none";
        console.log("initialize")
    };

    function gameModePvp() {
        gameInfoCont.textContent = "Choose Player names:";
        pvpBtn.style.display = "none";
        CPUBtn.style.display = "none";
        submitBtn.style.display = "block";
        playerNamesForm.style.display = "block";
    }

    function gameModeCPU() {
        console.log("sad")
    }

    function submitNames() {
        playerOne = player(playerOneName.value, 1);
        playerTwo = player(playerTwoName.value, 2);
    }


    


    
    function updateGameFlow(){
        (turnOrder == 1) ? (turnOrder = 2): (turnOrder = 1);
        checkWin()
    };

    function checkWin(){
        let p1WinCounter = 0, p2WinCounter = 0;

        const checkWinCycleY = (valueY) => {
            for (let i = 0; i < 9; i++){
                (gridSquaresObj[i].posY == valueY && 
                gridSquaresObj[i].markSquare == "player1") ? p1WinCounter++:
                (gridSquaresObj[i].posY == valueY && 
                gridSquaresObj[i].markSquare == "player2") ? p2WinCounter++:
                null;
                checkCounter();
            };
            p1WinCounter = 0, p2WinCounter = 0
        };

        const checkWinCycleX = (valueX) => {
            for (let i = 0; i < 9; i++){
                (gridSquaresObj[i].posX == valueX && 
                gridSquaresObj[i].markSquare == "player1") ? p1WinCounter++:
                (gridSquaresObj[i].posX == valueX && 
                gridSquaresObj[i].markSquare == "player2") ? p2WinCounter++:
                null;
                checkCounter();
            };
            p1WinCounter = 0, p2WinCounter = 0
        };

        function checkWinCycleDiag(a, b, c){

                (gridSquaresObj[a].markSquare == "player1" &&
                 gridSquaresObj[b].markSquare == "player1" &&
                  gridSquaresObj[c].markSquare == "player1") 
                  ? p1WinCounter = 3: p1WinCounter = 0;

                (gridSquaresObj[a].markSquare == "player2" &&
                    gridSquaresObj[b].markSquare == "player2" &&
                    gridSquaresObj[c].markSquare == "player2") 
                 ? p2WinCounter = 3:
                p2WinCounter = 0;
                
                checkCounter();
        };

        function checkTie() {
            for(let i = 0; i < 9; i++){
                if (gridSquaresObj[i].markSquare == "player1" 
                || gridSquaresObj[i].markSquare == "player2" ){
                isTie++
                }
            }
            checkCounter();
            isTie = 0;
        }

        for (let i = 0; i < 3; i++){
            valueY = arrY[i];
            checkWinCycleY(valueY);
        };

        for (let i = 0; i < 3; i++){
            valueX = arrX[i];
            checkWinCycleX(valueX);
        };

        checkWinCycleDiag(0, 4, 8);
        checkWinCycleDiag(2, 4, 6);

        if(p1WinCounter >= 3 || p2WinCounter >= 3){
        checkTie();
        };
        
        function checkCounter(){
            if (p1WinCounter == 3 ){
                alert(playerOne.playerName + " wins")
                p1WinCounter = 0, p2WinCounter = 0
            }else if (p2WinCounter == 3 ){
                alert(playerTwo.playerName + " wins")
                p1WinCounter = 0, p2WinCounter = 0
            }else if (isTie == 9){
                alert("TIE")
                p1WinCounter = 0, p2WinCounter = 0
            }

        };
        
    };


    // game board

    const gameBoard = (() => {  

        
        const gridSquare = (indexNumber) => {

            let squareElement, posX, posY;
            const markSquare = () => {
                (turnOrder == 1) ? (gridSquaresObj[indexNumber].markSquare = "player1",
                     squareElement.textContent = "X"):
                (turnOrder == 2) ? (gridSquaresObj[indexNumber].markSquare = "player2", 
                    squareElement.textContent = "O"): stopGame();
                
                updateGameFlow();
            }

            squareElement = document.createElement("div");
                
                squareElement.classList.add("gameBoardGrid");
                gameBoardBase.appendChild(squareElement);

                (indexNumber == 0 || indexNumber == 1 || indexNumber == 2) ? posY = "top":
                (indexNumber == 3 || indexNumber == 4 || indexNumber == 5) ? posY = "mid":
                posY = "bottom";

                (indexNumber == 0 || indexNumber == 3 || indexNumber == 6) ? posX = "left":
                (indexNumber == 1 || indexNumber == 4 || indexNumber == 7) ? posX = "mid":
                posX = "right";

                squareElement.addEventListener("click", markSquare, {once: true});

            return {indexNumber, markSquare , posX, posY};
        };

        for(let i = 0 ; i < 9 ; i++){
        const square = gridSquare(i);
            gridSquaresObj.push(square);
        };

        console.log(gridSquaresObj);

    })();
}
)();

