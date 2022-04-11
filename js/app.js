// variables here -----------------------------------------------------------------
let numberOfShipsToPlace = 5;
let numberOfEnemyShipsRemaining = 5;
let currentShipClicked = null;
let currentShipVertical = false;
let holdingShip = false;
let playerMap = {};
let attackPhase = false;
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
    let newShip = `<div id="ship${num}" class="ship ${num} ship${num}"></div>`;
    let makingShip = ".ship"+num
    $('#chooseShip').append(newShip);
    for (let i = 0; i < num; i++) {
        $(makingShip).append(`<div id='pieceOf${num}' class='shipSquare'></div>`);
    }
    // click event for ship divs here -------------------------------------------------
    $(".ship").click(function(evt){
        let ship = $(evt.target).parents(".ship").attr("id");
        $('#'+ship).css("visibility", "hidden");
        currentShipClicked = ship;
        holdingShip = true;
    })
}
function createSecond3LongShip(){
    let newShip = `<div id="secondShip3" class="ship 3 ship3"></div>`;
    $('#chooseShip').append(newShip);
    for (let i = 0; i < 3; i++) {
        $('#secondShip3').append("<div id='pieceOfSecond3' class='shipSquare'></div>");
    }
}
function makePlayerMap(){
    for (let i=1; i<101;i++){
        playerMap[i]=0;
    }
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
        $('#text').text('Try to find enemy ships!');
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

//text here ------------------------------------------------------------

//events -------------------------------------------------------
$('.startGame').click(function(evt){
    console.log('clicked start game');
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
                if(square.id.endsWith('1')){
                    $(square).css('background-color','red')
                } else {
                    let shipLength = square.id - 1;
                    $('#'+shipLength).css('background-color','darkgrey')
                }
            } else if(currentShipClicked==="ship3"){
                if(square.id.endsWith('2')||square.id.endsWith('1')){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<3;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="secondShip3"){
                if(square.id.endsWith('2')||square.id.endsWith('1')){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<3;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="ship4"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<4;i++) {
                        let shipLength = square.id - i;
                        $('#'+shipLength).css('background-color','darkgrey')
                    }
                }
            } else if(currentShipClicked==="ship5"){
                if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')||square.id.endsWith('4')){
                    $(square).css('background-color','red')
                } else {
                    for (let i=0;i<5;i++) {
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
                }
            }
        }
)
$('.square').click(function(evt){
    if(holdingShip===true){
        if(currentShipClicked==="ship2"){
        //checking if ship will be out of bounds. if box id is 1 dont run 
            if(!evt.target.id.endsWith('1')){
                console.log(evt.target.id);
                playerMap[evt.target.id]=1;
                playerMap[evt.target.id-1] =1;
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship3'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')){
                console.log(evt.target.id);
                playerMap[evt.target.id]=1;
                for(var i=0; i<3;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='secondShip3'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')){
                console.log(evt.target.id);
                playerMap[evt.target.id]=1;
                for(var i=0; i<3;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship4'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&!evt.target.id.endsWith('3')){
                console.log(evt.target.id);
                playerMap[evt.target.id]=1;
                for(var i=0; i<4;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                allShipsPlaced();
            }
        } else if(currentShipClicked==='ship5'){
            if(!evt.target.id.endsWith('1')&&!evt.target.id.endsWith('2')&&!evt.target.id.endsWith('3')&&!evt.target.id.endsWith('4')){
                console.log(evt.target.id);
                playerMap[evt.target.id]=1;
                for(var i=0; i<5;i++){
                    playerMap[evt.target.id-i] =1;
                }
                holdingShip=false;
                markPlayerGrid();
                numberOfShipsToPlace--;
                console.log(numberOfShipsToPlace)
                allShipsPlaced();
            }
        }   
    }
})
