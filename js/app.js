
//function here ----------------------------------------------------------------
function buildGrid(str){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`;
        $(str).append(newSquare);
    }
}
function hidePlayerGrid(){
    $('#playerGrid').toggle();
}
function hideChooseShip(){
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
        $(makingShip).append("<div class='shipSquare'></div>");
    }
}
function createSecond3LongShip(){
    let newShip = `<div id="second3Ship" class="ship 3 ship3"></div>`;
    $('#chooseShip').append(newShip);
    for (let i = 0; i < 3; i++) {
        $('#second3Ship').append("<div class='shipSquare'></div>");
    }

}

// start game    ------------------------------------
startButtonText();
buildGrid("#mainGrid");
buildGrid("#playerGrid");
hidePlayerGrid();
hideChooseShip();



//text here -----------------------------------------




//events -------------------------------------------------------
$('.startGame').click(function(evt){
    console.log('clicked start game');
    hideChooseShip();
    placeShipsText();
    createShip(2);
    createShip(3);
    createSecond3LongShip();
    createShip(4);
    createShip(5);
})
