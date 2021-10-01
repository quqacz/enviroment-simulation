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
    chunkSize: 64,
}

canvas.width = constants.mapWidth * constants.mapScale;
canvas.height = constants.mapHeight * constants.mapScale;
canvas.clientHeight = canvas.height;
canvas.clientWidth = canvas.width;


// showMap();
// showCollisionMap();
// showFoliageMap();

function showMap(){
    for(let i = 0; i < (constants.mapWidth * constants.mapHeight) / constants.chunkSize; i++){
        for(let j = 0; j < (constants.mapWidth * constants.mapHeight) / constants.chunkSize; j++){
            showChunk(i, j);
        }
    }
}

function showChunk(x, y){
    for(let i = 0; i < constants.chunkSize; i++){
        for(let j = 0; j < constants.chunkSize; j++){
            
            // loop to fill color of height map
            const tresholds = Object.keys(terrainMapCollors);
            for(let c = 0; c < tresholds.length; c++){
                if(chunkedMap[x][y].heightMap[i][j] <= tresholds[c]){
                    ctx.fillStyle = terrainMapCollors[tresholds[c]];
                    break;
                }
            }
            ctx.fillRect(x * constants.chunkSize + i, y * constants.chunkSize + j, 1, 1);


            // if(chunkedMap[x][y].collisionMap[i][j]){
            //     ctx.fillStyle = 'black';  
            //     ctx.fillRect(x * constants.chunkSize + i + .25, y * constants.chunkSize + j + .25, .5, .5);
            // }

            if(chunkedMap[x][y].foliageMap[i][j]){
                ctx.fillStyle = 'red';
                ctx.fillRect(x * constants.chunkSize + i, y * constants.chunkSize + j, 1, 1);
            }
        } 
    }
}