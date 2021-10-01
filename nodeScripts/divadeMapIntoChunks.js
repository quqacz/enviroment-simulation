const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {generate2dArray} = require("./helperFunctions");

const chunkedMap = generate2dArray((constants.mapWidth * constants.mapScale) / constants.chunkSize, (constants.mapHeight * constants.mapScale) / constants.chunkSize);

let heightMap;
let collisionMap;
let foliageMap;

fs.readFile('../map.js', (err, data)=>{
    if (err) {
       return console.error(err);
    }
    heightMap = JSON.parse(data.slice(data.indexOf("["), data.length));

    fs.readFile('../collisionMap.js', (err, data)=>{
        if (err) {
           return console.error(err);
        }
        collisionMap = JSON.parse(data.slice(data.indexOf("["), data.length));

        fs.readFile('../foliageMap.js', (err, data)=>{
            if (err) {
               return console.error(err);
            }
            foliageMap = JSON.parse(data.slice(data.indexOf("["), data.length));

            const chunkedMapWidth = (constants.mapWidth * constants.mapScale) / constants.chunkSize;
            const chunkedMapHeight = (constants.mapHeight * constants.mapScale) / constants.chunkSize;

            const chunkedMap = generate2dArray(chunkedMapWidth, chunkedMapHeight);

            for(let i = 0; i < 5; i++){
                for(let j = 0; j < 5; j++){
                    chunkedMap[i][j] = createChunkData(i, j);
                }
            }

            fs.writeFile('../chunkedMap.js', 'const chunkedMap = ' + JSON.stringify(chunkedMap), function(err) {
                if (err) {
                   return console.error(err);
                }
             });
        });
    });

});

function createChunkData(x, y){
    let chunk = new Chunk();
    let mapOffset = constants.chunkSize / constants.mapScale;
    console.log(mapOffset);
    // loop to get information from height map
    for(let i = 0; i < mapOffset; i++){
        for(let j = 0; j < mapOffset; j++){
            // loop for scale factor
            for(let k = 0; k < constants.mapScale; k++){
                for(let l = 0; l < constants.mapScale; l++){
                    chunk.heightMap[i * x + k][j * x + l] = heightMap[i][j];
                }
            }
        }
    }

    // // loop to generate collision map data
    // for(let i = 0; i < constants.chunkSize; i++){
    //     for(let j = 0; j < constants.chunkSize; j++){
    //         chunk.collisionMap[x + i][y + j] = collisionMap[i + x][j + y];
    //     }
    // }

    // // loop to generate foliage map data
    // for(let i = 0; i < constants.chunkSize; i++){
    //     for(let j = 0; j < constants.chunkSize; j++){
    //         chunk.foliageMap[x + i][y + j] = foliageMap[i + x][j + y];
    //     }
    // }
    
    return chunk;
}

class Chunk{
    constructor(){
        this.foliageMap = generate2dArray(constants.chunkSize, constants.chunkSize);
        this.collisionMap = generate2dArray(constants.chunkSize, constants.chunkSize);
        this.heightMap = generate2dArray(constants.chunkSize, constants.chunkSize);
    }
}