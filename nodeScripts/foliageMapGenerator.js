const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {generate2dArray} = require("./helperFunctions");

fs.readFile('../collisionMap.js', (err, data)=>{
    if (err) {
       return console.error(err);
    }
    const collisionMap = JSON.parse(data.slice(data.indexOf("["), data.length));

    const foliageMap = generate2dArray(constants.mapWidth * constants.mapScale, constants.mapHeight * constants.mapScale, 0);
    generateFoliageMap(collisionMap, foliageMap);

    fs.writeFile('../foliageMap.js', 'const foliageMap = ' + JSON.stringify(foliageMap), function(err) {
        if (err) {
            return console.error(err);
        }
    });
});

function generateFoliageMap(collisionMap, foliageMap){
    for(let i = 0; i < collisionMap.length - constants.foliageSize; i += constants.foliageSize){
        for(let j = 0; j < collisionMap[i].length - constants.foliageSize; j += constants.foliageSize){
            let chance = Math.random();
            if(chance > constants.foliageDensity && collisionMap[i][j]){
                for(let k = 0; k < constants.foliageSize; k++){
                    for(let l = 0; l < constants.foliageSize; l++){
                        foliageMap[i + k][j + l] = 1;
                    }
                }
            }
        }
    }
}