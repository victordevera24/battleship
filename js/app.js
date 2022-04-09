
//function here ----------------------------------------------------------------
function buildGrid(str){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`
        $(str).append(newSquare);
    }
}
function hidePlayerGrid(){
    $('#playerGrid').css('display', 'none');
}
function showPlayerGrid(){
    $('#playerGrid').css('display', '');
}
function creatShip(num){
    
}

// building grid called here ------------------------------------
buildGrid("#mainGrid")
buildGrid("#playerGrid")
hidePlayerGrid()
showPlayerGrid()
hidePlayerGrid()

//text here -----------------------------------------
$('#text').text('Click ship, then hover over grid to place')
