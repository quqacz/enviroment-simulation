const canvas = document.querySelector("#canvas");
const canvasWrapper = document.querySelector("#canvas-wrapper");
const ctx = canvas.getContext("2d");

const constants = {
    canvasWidth: canvasWrapper.clientWidth,
    canvasHeight: canvasWrapper.clientHeight,
    mapWidth: 256,
    mapHeight: 256,
    mapDivisions: 67,
    mapScale: 16,
    terrainOffset: .25,
}

canvas.width = constants.mapWidth * constants.mapScale;
canvas.height = constants.mapHeight * constants.mapScale;
canvas.clientHeight = canvas.height;
canvas.clientWidth = canvas.width;


// showMap();
showCollisionMap();


function showMap(){
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(map[i][j] <= 0){
                ctx.fillStyle = "blue";
            }else if(map[i][j] <= .1){
                ctx.fillStyle = "yellow";
            }else if(map[i][j] <= .7){
                ctx.fillStyle = "green";
            }else{
                ctx.fillStyle = "brown";
            }
            ctx.fillRect(i * constants.mapScale, j * constants.mapScale , constants.mapScale, constants.mapScale);
        }
    }
}

function showCollisionMap(){
    for(let i = 0; i < collisionMap.length; i++){
        for(let j = 0; j < collisionMap[i].length; j++){
            if(collisionMap[i][j]){
                ctx.fillStyle = 'black';
                ctx.fillRect(i + .25, j + .25, .5, .5);
            }
        }
    }
}