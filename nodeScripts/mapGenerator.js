const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {perlin, generate2dArray} = require("./helperFunctions");

perlin.seed();
const map = generateMap(constants.mapWidth * constants.mapScale, constants.mapHeight * constants.mapScale);

fs.writeFile('../map.js', 'const map = ' + JSON.stringify(map), function(err) {
   if (err) {
      return console.error(err);
   }
});

function generateMap(width, height){
    let arr = generate2dArray(width, height);

    for(let i = 0; i < width/ constants.mapScale; i++){
        for(let j = 0; j < height / constants.mapScale; j++){
            for(let k = 0; k < constants.mapScale; k++){
                for(let l = 0; l < constants.mapScale; l++){
                    arr[i * constants.mapScale + k][j * constants.mapScale + l] = perlin.get(i / constants.mapDivisions, j / constants.mapDivisions) + constants.terrainOffset;
                }
            }
        }
    }
    return arr;
}

// arr[i + k][j + l] = perlin.get(i / constants.mapDivisions, j / constants.mapDivisions) + constants.terrainOffset;