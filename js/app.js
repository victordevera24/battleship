
//function here ----------------------------------------------------------------
function buildGrid(str){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`;
        $(str).append(newSquare);
    }
}
function hidePlayerGrid(){
    $('#playerGrid').css('display', 'none');
}
function showPlayerGrid(){
    $('#playerGrid').css('display', '');
}
function startButtonText(){
    $('#text').html("<button class='startGame'>Start Game</button>");
}
function placeShipsText(){
    $('#text').text("Place ships");
}
// function creatShip(num){
//     for (let i = 0; i < num; i++) {
//         let ship = 
//     }
// }

// start game    ------------------------------------
startButtonText();
buildGrid("#mainGrid");
buildGrid("#playerGrid");
hidePlayerGrid();



//text here -----------------------------------------




//events -------------------------------------------------------
$('.startGame').click(function(evt){
    console.log('clicked start game');
    placeShipsText();
})
