const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {generate2dArray, getMapFromFile} = require("./helperFunctions");

const chunkedMap = generate2dArray((constants.mapWidth * constants.mapScale) / constants.chunkSize, (constants.mapHeight * constants.mapScale) / constants.chunkSize);

let heightMap = getMapFromFile('../map.js');
let collisionMap;
let foliageMap;

console.table(heightMap);

// fs.readFile('../map.js', (err, data)=>{
//     if (err) {
//        return console.error(err);
//     }
//     heightMap = JSON.parse(data.slice(data.indexOf("["), data.length));
// });

// fs.readFile('../collisionMap.js', (err, data)=>{
//     if (err) {
//        return console.error(err);
//     }
//     collisionMap = JSON.parse(data.slice(data.indexOf("["), data.length));
// });

// fs.readFile('../foliageMap.js', (err, data)=>{
//     if (err) {
//        return console.error(err);
//     }
//     foliageMap = JSON.parse(data.slice(data.indexOf("["), data.length));
// });

// for(let i = 0; i < constants.mapWidth * constants.mapScale; i++){
//     for(let j = 0; j < constants.mapWidth * constants.mapScale; j++){

//     }
// }

// console.log(heightMap.isArray());
// createChunkData (10, 0);

function createChunkData(x, y){
    if(x + constants.chunkSize >= constants.mapWidth * constants.mapScale || y + constants.chunkSize >= constants.mapHeight * constants.mapScale)
        return;
    console.log(Math.floor(x / constants.mapScale), Math.floor(constants.chunkSize/constants.mapScale))
    for(let i = Math.floor(x / constants.mapScale); i < Math.floor(constants.chunkSize/constants.mapScale); i++){
        console.log(heightMap[i][0]);
    }
}

class Chunk{
    constructor(chunkSize){
        this.foliageMap = generate2dArray(chunkSize);
        this.collisionMap = generate2dArray(chunkSize);
        this.heightMap = generate2dArray(chunkSize);
    }
}