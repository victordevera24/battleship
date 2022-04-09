
// build grid here ----------------------------------------------------------------
function buildGrid(){
    for(var i=1;i<101;i++){
        let newSquare = `<div id="${i}" class="square"></div>`
        $('#mainGrid').append(newSquare);
    }
}

buildGrid()