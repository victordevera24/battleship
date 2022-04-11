// variables here -----------------------------------------------------------------
let numberOfShipsToPlace = 5;
let numberOfEnemyShipsRemaining = 5;
let currentShipClicked = null;
let currentShipVertical = false;
let holdingShip = false;
//function here ----------------------------------------------------------------
function buildGrid(str){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`;
        $(str).append(newSquare);
    }
    // if(!currentShipClicked===null){
    //     $('.square').hover(function(evt){
    //         console.log(evt.target.id)
    //     })
    // }
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
        console.log(holdingShip);
    })
}
function createSecond3LongShip(){
    let newShip = `<div id="secondShip3" class="ship 3 ship3"></div>`;
    $('#chooseShip').append(newShip);
    for (let i = 0; i < 3; i++) {
        $('#secondShip3').append("<div id='pieceOfSecond3' class='shipSquare'></div>");
    }
}
// start game    -------------------------------------------------------
startButtonText();
buildGrid("#mainGrid");
buildGrid("#playerGrid");
togglePlayerGrid();
toggleChooseShip();
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
    let square = evt.target
    if(holdingShip===true){
        $(square).css('background-color','purple')
        if(currentShipClicked==="ship2"){
            if(square.id.endsWith('1')){
                $(square).css('background-color','red')
            } else {
                let shipLength = square.id - 1;
                console.log(shipLength)
                $('#'+shipLength).css('background-color','purple')
            }
        } else if(currentShipClicked==="ship3"){
            if(square.id.endsWith('2')||square.id.endsWith('1')){
                $(square).css('background-color','red')
            } else {
                for (let i=0;i<3;i++) {
                    let shipLength = square.id - i;
                    console.log(shipLength)
                    $('#'+shipLength).css('background-color','purple')
                }
            }
        } else if(currentShipClicked==="secondShip3"){
            if(square.id.endsWith('2')||square.id.endsWith('1')){
                $(square).css('background-color','red')
            } else {
                for (let i=0;i<3;i++) {
                    let shipLength = square.id - i;
                    console.log(shipLength)
                    $('#'+shipLength).css('background-color','purple')
                }
            }
        } else if(currentShipClicked==="ship4"){
            if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')){
                $(square).css('background-color','red')
            } else {
                for (let i=0;i<4;i++) {
                    let shipLength = square.id - i;
                    console.log(shipLength)
                    $('#'+shipLength).css('background-color','purple')
                }
            }
        } else if(currentShipClicked==="ship5"){
            if(square.id.endsWith('2')||square.id.endsWith('1')||square.id.endsWith('3')||square.id.endsWith('4')){
                $(square).css('background-color','red')
            } else {
                for (let i=0;i<5;i++) {
                    let shipLength = square.id - i;
                    console.log(shipLength)
                    $('#'+shipLength).css('background-color','purple')
                }
            }
        }
    }
    },function(evt){
        let square = evt.target
        $(square).css('background-color','blue')
        if(currentShipClicked==="ship2"){
            let shipLength = square.id - 1;
            console.log(shipLength)
            $('#'+shipLength).css('background-color','blue')
        } else if(currentShipClicked==="ship3"){
            for(let i=0; i<3; i++){
                let shipLength = square.id - i;
                console.log(shipLength)
                $('#'+shipLength).css('background-color','blue')
            }
        } else if(currentShipClicked==="secondShip3"){
            for(let i=0; i<3; i++){
                let shipLength = square.id - i;
                console.log(shipLength)
                $('#'+shipLength).css('background-color','blue')
            }
        } else if(currentShipClicked==="ship4"){
            for(let i=0; i<4; i++){
                let shipLength = square.id - i;
                console.log(shipLength)
                $('#'+shipLength).css('background-color','blue')
            }
        } else if(currentShipClicked==="ship5"){
            for(let i=0; i<5; i++){
                let shipLength = square.id - i;
                console.log(shipLength)
                $('#'+shipLength).css('background-color','blue')
            }
        }
    }
)
