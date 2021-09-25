const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {perlin} = require("./helperFunctions");

perlin.seed();
const map = generateMap(constants.mapWidth, constants.mapHeight);

fs.writeFile('../map.js', 'const map = ' + JSON.stringify(map), function(err) {
   if (err) {
      return console.error(err);
   }
});

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