// variables here -----------------------------------------------------------------
let numberOfShipsToPlace = 5;
let numberOfEnemyShipsRemaining = 5;
let currentShipClicked = null;
let currentShipVertical = false;
let holdingShip = false;
let playerMap = {};
let computerMap = {};
let attackPhase = false;
let playerTurn = true;
let computerShipPartsHit = 0;
let playerShipPartsHit = 0;
let computerTry = 0;
// start game    -------------------------------------------------------
startButtonText();
buildGrid("#mainGrid");
buildGrid("#playerGrid");
togglePlayerGrid();
toggleChooseShip();
makePlayerMap();
//function here ----------------------------------------------------------------
function buildGrid(str){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`;
        $(str).append(newSquare);
    }
}
function togglePlayerGrid(){
    $('#playerGrid').toggle();
}
function toggleChooseShip(){
    $('#chooseShip').toggle();
}
function startButtonText(){
    $('#text').html("<button class='startGame'>Start Game</button>");
}
function placeShipsText(){
    $('#text').text("Place ships");
}
function createShip(num){
    let newShip = `<div id="afterThis${num}"class='eachShip'><div id="ship${num}" class="ship ${num} ship${num}"></div><p>OR</p><div id="verticalShip${num}" class="verticalShip vertical${num} verticalShip${num}"></div></div>`;
    let makingShip = ".ship"+num
    let makingVerticalShip = ".verticalShip"+num
    $('#chooseShip').append(newShip);
    for (let i = 0; i < num; i++) {
        $(makingShip).append(`<div id='pieceOf${num}' class='shipSquare'></div>`);
        $(makingVerticalShip).append(`<div id='pieceOfVertical${num}' class='shipSquare'></div>`);
    }
    // click event for ship divs here -------------------------------------------------
    $(".ship").click(function(evt){
        let ship = $(evt.target).parents(".ship").attr("id");
        if(ship=="ship2"){
            $('#verticalShip2').css('visibility', 'hidden');
        } else if(ship=="ship3"){
            $('#verticalShip3').css('visibility', 'hidden');
        } else if(ship=="secondShip3"){
            $('#verticalSecondShip3').css('visibility', 'hidden');
        } else if(ship=="ship4"){
            $('#verticalShip4').css('visibility', 'hidden');
        } else if(ship=="ship5"){
            $('#verticalShip5').css('visibility', 'hidden');
        }
        $('#'+ship).css("visibility", "hidden");
        currentShipClicked = ship;
        holdingShip = true;
    })
    $('.verticalShip').click(function(evt){
        let ship = $(evt.target).parents(".verticalShip").attr("id");
        if(ship=="verticalShip2"){
            $('#ship2').css('visibility', 'hidden');
        } else if(ship=="verticalShip3"){
            $('#ship3').css('visibility', 'hidden');
        } else if(ship=="verticalSecondShip3"){
            $('#secondShip3').css('visibility', 'hidden');
        } else if(ship=="verticalShip4"){
            $('#ship4').css('visibility', 'hidden');
        } else if(ship=="verticalShip5"){
            $('#ship5').css('visibility', 'hidden');
        }
        $('#'+ship).css("visibility", "hidden");
        currentShipClicked = ship;
        holdingShip = true;
    })
}
function createSecond3LongShip(){
    let newShip = `<div id="afterThis23"class="eachShip"><div id="secondShip3" class="ship 3 ship3"></div><p>OR</p><div id="verticalSecondShip3" class="verticalShip verticalSecond3 verticalShip23"></div></div>`;
    $('#chooseShip').append(newShip);
    for (let i = 0; i < 3; i++) {
        $('#secondShip3').append("<div id='pieceOfSecond3' class='shipSquare'></div>");
        $("#verticalSecondShip3").append(`<div id='pieceOfVerticalSecond3' class='shipSquare'></div>`);
    }
}
function makePlayerMap(){
    for (let i=1; i<101;i++){
        playerMap[i]=0;
        computerMap[i]=0;
    }
    randomComputerShips();
}
function markPlayerGrid(){
    for (const box in playerMap){
        if(playerMap[box]===1){
            $('#'+box).css('background-color','darkgray');
        }
    }
}
function allShipsPlaced(){
    if(numberOfShipsToPlace===0){
        $('#text').text('Destroy all enemy ships!');
        togglePlayerGrid();
        toggleChooseShip();
        $('#mainGrid .square').css('background-color','blue');
        fillPlayerGrid();
        attackPhase=true;
    }
}
function fillPlayerGrid(){
    for (const box in playerMap){
        if(playerMap[box]===1){
            $('#playerGrid #'+box).css('background-color','rgb(55,54,51)');
        }
    }
}
function randomComputerShips(){
    let firstShipOrientation = Math.round(Math.random());
    if(firstShipOrientation===0){
        let firstShipStart = Math.floor(Math.random()*100)+1;
        while(firstShipStart.toString().endsWith('1')){
            firstShipStart = Math.floor(Math.random()*100)+1;
        }
        computerMap[firstShipStart] = 1;
        computerMap[firstShipStart-1] = 1;
    } else {
        let firstShipStart = Math.floor(Math.random()*100)+1;
        while(firstShipStart<11){
            firstShipStart = Math.floor(Math.random()*100)+1;
        }
        computerMap[firstShipStart] = 1;
        computerMap[firstShipStart-10] = 1;
    }
    let secondShipOrientation = Math.round(Math.random());
    if(secondShipOrientation===0){
        let secondShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[secondShipStart] === 1||computerMap[secondShipStart-1] === 1||computerMap[secondShipStart-2] === 1||secondShipStart.toString().endsWith('1')||secondShipStart.toString().endsWith('2')){
            secondShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<3;i++){
            computerMap[secondShipStart-i] = 1;
        }
    } else {
        let secondShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[secondShipStart] === 1||computerMap[secondShipStart-10] === 1||computerMap[secondShipStart-20] === 1||secondShipStart<21){
            secondShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<21;i+=10){
            computerMap[secondShipStart-i] = 1;
        }
    }
    let thirdShipOrientation = Math.round(Math.random());
    if(thirdShipOrientation===0){
        let thirdShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[thirdShipStart] === 1||computerMap[thirdShipStart-1] === 1||computerMap[thirdShipStart-2] === 1||thirdShipStart.toString().endsWith('1')||thirdShipStart.toString().endsWith('2')){
            thirdShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<3;i++){
            computerMap[thirdShipStart-i] = 1;
        }
    } else {
        let thirdShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[thirdShipStart] === 1||computerMap[thirdShipStart-10] === 1||computerMap[thirdShipStart-20] === 1||thirdShipStart<21){
            thirdShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<21;i+=10){
            computerMap[thirdShipStart-i] = 1;
        }
    }
    let forthShipOrientation = Math.round(Math.random());
    if(forthShipOrientation===0){
        let forthShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[forthShipStart] === 1||computerMap[forthShipStart-1] === 1||computerMap[forthShipStart-2] === 1||computerMap[forthShipStart-3] === 1||forthShipStart.toString().endsWith('1')||forthShipStart.toString().endsWith('2')||forthShipStart.toString().endsWith('3')){
            forthShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<4;i++){
            computerMap[forthShipStart-i] = 1;
        }
    } else {
        let forthShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[forthShipStart] === 1||computerMap[forthShipStart-10] === 10||computerMap[forthShipStart-20] === 1||computerMap[forthShipStart-30] === 1||forthShipStart<31){
            forthShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<31;i+=10){
            computerMap[forthShipStart-i] = 1;
        }
    }
    let fifthShipOrientation = Math.round(Math.random());
    if(fifthShipOrientation===0){
        let fifthShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[fifthShipStart] === 1||computerMap[fifthShipStart-1] === 1||computerMap[fifthShipStart-2] === 1||computerMap[fifthShipStart-3] === 1||computerMap[fifthShipStart-4] === 1||fifthShipStart.toString().endsWith('1')||fifthShipStart.toString().endsWith('2')||fifthShipStart.toString().endsWith('3')||fifthShipStart.toString().endsWith('4')){
            fifthShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<5;i++){
            computerMap[fifthShipStart-i] = 1;
        }
    } else {
        let fifthShipStart = Math.floor(Math.random()*100)+1;
        while(computerMap[fifthShipStart] === 1||computerMap[fifthShipStart-10] === 1||computerMap[fifthShipStart-20] === 1||computerMap[fifthShipStart-30] === 1||computerMap[fifthShipStart-40] === 1||fifthShipStart<41){
            fifthShipStart = Math.floor(Math.random()*100)+1;
        }
        for(var i=0;i<41;i+=10){
            computerMap[fifthShipStart-i] = 1;
        }
    }
}
function checkIfWinner(){
    if(computerShipPartsHit===17){
        $('#text').text('Winner! You defeated Syknet! 🎉').css('font-size','35px').css('color','blue')
        attackPhase=false;
    }
}
function checkIfCompWinner(){
    if(playerShipPartsHit===17){
        $('#text').text('You should of gone for the head. 🫰').css('font-size','35px').css('color','red')
        attackPhase=false;
    }
}
function computerTurn(){
    let computerGuess = Math.floor(Math.random()*100)+1;
    while(playerMap[computerGuess]===6){
        computerGuess = Math.floor(Math.random()*100)+1;
    }
    if(playerMap[computerGuess]===1){
        compHit(computerGuess);
        computerTurnAgain(computerGuess);
    } else {
        compMiss(computerGuess);
    }
    playerTurn=true;
}
function computerTurnAgain(computerGuess){
    if(attackPhase==true){
        if(computerGuess===1){
            if(computerTry===2){
                computerTry=0;
                computerTurn()
            } else {
                let computerSecondGuess = Math.round(Math.random())
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    }
                } else if(computerSecondGuess===0){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                }
            }
        } else if(computerGuess===10){
            if(computerTry===2){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.round(Math.random())
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess-1]===1){
                        compHit(computerGuess-1);
                        computerTry=0;
                        computerTurnAgain(computerGuess-1);
                    } else if(playerMap[computerGuess-1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-1);
                    } 
                } else if(computerSecondGuess===0){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess);
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                } 
            }
        } else if(computerGuess===91){
            if(computerTry===2){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.round(Math.random())
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    } 
                } else if(computerSecondGuess===0){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess);
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } 
            }
        } else if(computerGuess===100){
            if(computerTry===2){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.round(Math.random())
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess1]===1){
                        compHit(computerGuess1);
                        computerTry=0;
                        computerTurnAgain(computerGuess1);
                    } else if(playerMap[computerGuess1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess1);
                    } 
                } else if(computerSecondGuess===0){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess);
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } 
            }
        } else if(computerGuess>1&&computerGuess<10){
            if(computerTry===3){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.floor(Math.random()*3)+1
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess-1]===1){
                        compHit(computerGuess-1);
                        computerTry=0;
                        computerTurnAgain(computerGuess-1);
                    } else if(playerMap[computerGuess-1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-1);
                    } 
                } else if (computerSecondGuess===2){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                } else if (computerSecondGuess===3){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    }
                } 
            }
        } else if(computerGuess>91&&computerGuess<100){
            if(computerTry===3){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.floor(Math.random()*3)+1
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess-1]===1){
                        compHit(computerGuess-1);
                        computerTry=0;
                        computerTurnAgain(computerGuess-1);
                    } else if(playerMap[computerGuess-1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-1);
                    } 
                } else if (computerSecondGuess===2){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } else if (computerSecondGuess===3){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    }
                } else if(computerTry===3){
                    computerTry=0;
                    computerTurn();
                }
            }
        } else if(computerGuess.toString().endsWith('1')&&computerGuess!==1&&computerGuess!==91){
            if(computerTry===3){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.floor(Math.random()*3)+1
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    } 
                } else if (computerSecondGuess===2){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } else if (computerSecondGuess===3){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                } 
            }
        } else if(computerGuess.toString().endsWith('0')&&computerGuess!==10&&computerGuess!==100){
            if(computerTry===3){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.floor(Math.random()*3)+1
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess-1]===1){
                        compHit(computerGuess-1);
                        computerTry=0;
                        computerTurnAgain(computerGuess-1);
                    } else if(playerMap[computerGuess-1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-1);
                    } 
                } else if (computerSecondGuess===2){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } else if (computerSecondGuess===3){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                } 
            }
        } else {
            if(computerTry===4){
                computerTry=0;
                computerTurn();
            } else {
                let computerSecondGuess = Math.floor(Math.random()*4)+1
                if(computerSecondGuess===1){
                    if(playerMap[computerGuess-1]===1){
                        compHit(computerGuess-1);
                        computerTry=0;
                        computerTurnAgain(computerGuess-1);
                    } else if(playerMap[computerGuess-1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-1);
                    } 
                } else if (computerSecondGuess===2){
                    if(playerMap[computerGuess-10]===1){
                        compHit(computerGuess-10);
                        computerTry=0;
                        computerTurnAgain(computerGuess-10);
                    } else if(playerMap[computerGuess-10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess-10);
                    }
                } else if (computerSecondGuess===3){
                    if(playerMap[computerGuess+10]===1){
                        compHit(computerGuess+10);
                        computerTry=0;
                        computerTurnAgain(computerGuess+10);
                    } else if(playerMap[computerGuess+10]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+10);
                    }
                } else if (computerSecondGuess===4){
                    if(playerMap[computerGuess+1]===1){
                        compHit(computerGuess+1);
                        computerTry=0;
                        computerTurnAgain(computerGuess+1);
                    } else if(playerMap[computerGuess+1]===6){
                        computerTry++;
                        computerTurnAgain(computerGuess)
                    } else {
                        computerTry=0;
                        compMiss(computerGuess+1);
                    }
                } 
            }
        }
    } else {
        return
    }
}
function compHit(computerGuess){
    $('#playerGrid #'+computerGuess).css('background-color','red');
    playerShipPartsHit++;
    playerMap[computerGuess]=6;
    checkIfCompWinner();
}
function compMiss(computerGuess){
    $('#playerGrid #'+computerGuess).css('background-color','pink');
    $('#playerGrid #'+computerGuess).text('X');
    playerMap[computerGuess]=6;
}
//events -------------------------------------------------------
$('.startGame').click(function(evt){
    toggleChooseShip();
    placeShipsText();
    createShip(2);
    createShip(3);
    createSecond3LongShip();
    createShip(4);
    createShip(5);
})
$('.square').hover(function(evt){
    if(numberOfShipsToPlace>0){
        let square = evt.target
        if(holdingShip===true){
            $(square).css('background-color','darkgrey')
            if(currentShipClicked==="ship2"){
                if(square.id.endsWith('1')||playerMap[square.id]===1||playerMap[square.id-1]===1){
                    $(square).css('background-color','red')
                } else {
                    let shipLength = square.id - 1;
                    $('#'+shipLength).css('background-color','darkgrey')
                }
            } else if(currentShipClicked==="ship3"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||playerMap[square.id]===1||playerMap[square.id-1]===1||playerMap[square.id-2]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<3;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="secondShip3"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||playerMap[square.id]===1||playerMap[square.id-1]===1||playerMap[square.id-2]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<3;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="ship4"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')||playerMap[square.id]===1||playerMap[square.id-1]===1||playerMap[square.id-2]===1||playerMap[square.id-3]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<4;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="ship5"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')||square.id.endsWith('4')||playerMap[square.id]===1||playerMap[square.id-1]===1||playerMap[square.id-2]===1||playerMap[square.id-3]===1||playerMap[square.id-4]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<5;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="verticalShip2"){
                if(square.id<11||playerMap[square.id]===1||playerMap[square.id-10]===1){
                    $(square).css('background-color','red')
                } else {
                    let shipLength = square.id - 10;
                    $('#'+shipLength).css('background-color','darkgrey')
                }
            } else if(currentShipClicked==="verticalShip3"){
                if(square.id<21||playerMap[square.id]===1||playerMap[square.id-10]===1||playerMap[square.id-20]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<21;i+=10) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="verticalSecondShip3"){
                if(square.id<21||playerMap[square.id]===1||playerMap[square.id-10]===1||playerMap[square.id-20]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<21;i+=10) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="verticalShip4"){
                if(square.id<31||playerMap[square.id]===1||playerMap[square.id-10]===1||playerMap[square.id-20]===1||playerMap[square.id-30]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<31;i+=10) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="verticalShip5"){
                if(square.id<41||playerMap[square.id]===1||playerMap[square.id-10]===1||playerMap[square.id-20]===1||playerMap[square.id-30]===1||playerMap[square.id-40]===1){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<41;i+=10) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            }
        }
    }
}, function(evt){
    if(numberOfShipsToPlace>0){
        let square = evt.target
        $(square).css('background-color','blue')
        markPlayerGrid()
        if(currentShipClicked==="ship2"){
            let shipLength = square.id - 1;
            $('#'+shipLength).css('background-color','blue')
            markPlayerGrid()
        } else if(currentShipClicked==="ship3"){
            for(let i=0; i<3; i++){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="secondShip3"){
            for(let i=0; i<3; i++){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="ship4"){
            for(let i=0; i<4; i++){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="ship5"){
            for(let i=0; i<5; i++){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="verticalShip2"){
            let shipLength = square.id - 10;
            $('#'+shipLength).css('background-color','blue')
            markPlayerGrid()
        } else if(currentShipClicked==="verticalShip3"){
            for(let i=0; i<21; i+=10){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="verticalSecondShip3"){
            for(let i=0; i<21; i+=10){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="verticalShip4"){
            for(let i=0; i<31; i+=10){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        } else if(currentShipClicked==="verticalShip5"){
            for(let i=0; i<41; i+=10){
                let shipLength = square.id - i;
                $('#'+shipLength).css('background-color','blue')
                markPlayerGrid()
            }
        }
    }
})
$('.square').click(function(evt){
    if(holdingShip===true){
        if(currentShipClicked==="ship2"){
        //checking if ship will be out of bounds. if box id is 1 dont run 
            if(!evt.target.id.endsWith('1')&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-1]!==1){
                playerMap[evt.target.id]=1;
                playerMap[evt.target.id-1] =1;
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship3'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-1]!==1&&playerMap[evt.target.id-2]!==1){
                for(var i=0; i<3;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='secondShip3'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-1]!==1&&playerMap[evt.target.id-2]!==1){
                for(var i=0; i<3;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship4'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&!evt.target.id.endsWith('3')&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-1]!==1&&playerMap[evt.target.id-2]!==1&&playerMap[evt.target.id-3]!==1){
                for(var i=0; i<4;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship5'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&!evt.target.id.endsWith('3')&&!evt.target.id.endsWith('4')&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-1]!==1&&playerMap[evt.target.id-2]!==1&&playerMap[evt.target.id-3]!==1&&playerMap[evt.target.id-4]!==1){
                for(var i=0; i<5;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } if(currentShipClicked==="verticalShip2"){
            //checking if ship will be out of bounds. if box id is 1 dont run 
                if(!evt.target.id<11&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-10]!==1){
                    playerMap[evt.target.id]=1;
                    playerMap[evt.target.id-10] =1;
                    holdingShip=false;
                    markPlayerGrid();
                    numberOfShipsToPlace--;
                    allShipsPlaced();
                }
            } else if(currentShipClicked==='verticalShip3'){
                if(!evt.target.id<21&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-10]!==1&&playerMap[evt.target.id-20]!==1){
                    for(var i=0; i<21;i+=10){
                        playerMap[evt.target.id-i] =1;
                    }
                    holdingShip=false;
                    markPlayerGrid();
                    numberOfShipsToPlace--;
                    allShipsPlaced();
                }
            } else if(currentShipClicked==='verticalSecondShip3'){
                if(!evt.target.id<21&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-10]!==1&&playerMap[evt.target.id-20]!==1){
                    for(var i=0; i<21;i+=10){
                        playerMap[evt.target.id-i] =1;
                    }
                    holdingShip=false;
                    markPlayerGrid();
                    numberOfShipsToPlace--;
                    allShipsPlaced();
                }
            } else if(currentShipClicked==='verticalShip4'){
                if(!evt.target.id<31&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-10]!==1&&playerMap[evt.target.id-20]!==1&&playerMap[evt.target.id-30]!==1){
                    for(var i=0; i<31;i+=10){
                        playerMap[evt.target.id-i] =1;
                    }
                    holdingShip=false;
                    markPlayerGrid();
                    numberOfShipsToPlace--;
                    allShipsPlaced();
                }
            } else if(currentShipClicked==='verticalShip5'){
                if(!evt.target.id<41&&playerMap[evt.target.id]!==1&&playerMap[evt.target.id-10]!==1&&playerMap[evt.target.id-20]!==1&&playerMap[evt.target.id-30]!==1&&playerMap[evt.target.id-40]!==1){
                    for(var i=0; i<41;i+=10){
                        playerMap[evt.target.id-i] =1;
                    }
                    holdingShip=false;
                    markPlayerGrid();
                    numberOfShipsToPlace--;
                    allShipsPlaced();
                }
            }   
    } else if(attackPhase===true&&playerTurn===true){
        let box = evt.target.id;
        if(computerMap[box]===6){
            return
        } else if(computerMap[box]!==6){
            if(computerMap[box]===1){
                $('#'+box).css('background-color', 'red');
                computerShipPartsHit++;
                computerMap[box]=6;
                checkIfWinner();
            } else {
                $('#'+box).css('background-color', 'lightgrey');
                playerTurn=false;
                computerMap[box]=6;
                $('#'+box).text('X').css('text-align','center').css('font-size','35px');
                computerTurn();
            }
        }
    }
})
