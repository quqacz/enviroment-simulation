const canvas = document.querySelector("#canvas");
const canvasWrapper = document.querySelector("#canvas-wrapper");

const constants = {
    canvasWidth: canvasWrapper.clientWidth,
    canvasHeight: canvasWrapper.clientHeight,
    mapWidth: 500,
    mapHeight: 500,
    mapDivisions: 17,
    mapScale: 4,
    terrainOffset: .25,
}

const map = generateMap(constants.mapWidth, constants.mapHeight);

canvas.width = constants.mapWidth * constants.mapScale;
canvas.height = constants.mapHeight * constants.mapScale;
canvas.clientHeight = canvas.height;
canvas.clientWidth = canvas.width;

const ctx = canvas.getContext("2d");

showMap();

function generateMap(width, height){
    let arr = new Array(width);

    for(let i = 0; i < width; i++){
        arr[i] = new Array(height);
        for(let j = 0; j < height; j++){
            arr[i][j] = perlin.get(i / constants.mapDivisions, j / constants.mapDivisions) + constants.terrainOffset;
        }
    }
    return arr;
}

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