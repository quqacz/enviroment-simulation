const fs = require('fs');
const Constants = require('./constants');
const constants = Constants.constants;
const {generate2dArray, perlin} = require('./helperFunctions');

perlin.seed();
const map = generateHeightMap(constants.mapWidth, constants.mapHeight);

fs.writeFile('../map.js', 'const map = ' + JSON.stringify(map), function(err) {
   if (err) {
      return console.error(err);
   }
});

let collisionMap = generate2dArray(constants.mapWidth * constants.mapScale, constants.mapHeight * constants.mapScale, 1);
generateCollisionMap(map, collisionMap);
collisionMap = smoothOutEdges(collisionMap);

fs.writeFile('../collisionMap.js', 'const collisionMap = ' + JSON.stringify(collisionMap), function(err) {
    if (err) {
        return console.error(err);
    }
});


function generateHeightMap(width, height){
    let arr = new Array(width);

    for(let i = 0; i < width; i++){
        arr[i] = new Array(height);
        for(let j = 0; j < height; j++){
            arr[i][j] = perlin.get(i / constants.mapDivisions, j / constants.mapDivisions) + constants.terrainOffset;
        }
    }
    return arr;
}

function generateCollisionMap(map, collisionMap){
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y< map[x].length; y++){
            if(map[x][y] <= .8 && map[x][y] >= .001){
                for(let dx = 0; dx < constants.mapScale; dx++){
                    for(let dy = 0; dy< constants.mapScale; dy++){
                        collisionMap[x * constants.mapScale + dx][y * constants.mapScale + dy] = 1;
                    }
                }
            }else{
                for(let dx = 0; dx < constants.mapScale; dx++){
                    for(let dy = 0; dy< constants.mapScale; dy++){
                        collisionMap[x * constants.mapScale + dx][y * constants.mapScale + dy] = 0;
                    }
                } 
            }
        }
    }
}

function smoothOutEdges(map){
    let backupArr = generate2dArray(map.length, map[0].length, 1);
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            let sum = 0;
            let numberOfFields = 0;
            for(let dx = -2; dx < 3; dx++){
                for(let dy = -2; dy < 3; dy++){
                    if(dy !== 0 && dx !== 0){
                        if((dy !== -2 && dx !== -2) || (dy !== 2 && dx !== 2) || (dy !== -2 && dx !== 2) || (dy !== 2 && dx !== -2)){
                            if(i + dx >= 0 && i + dx < map.length && j + dy >= 0 && j + dy < map[i].length){
                                sum += map[i + dx][j + dy];
                                numberOfFields++;
                            }
                        }
                    }
                }
            }
            backupArr[i][j] = sum/numberOfFields;
        }
    }
    return backupArr;
}