const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;
const {generate2dArray} = require("./helperFunctions");


fs.readFile('../map.js', (err, data)=>{
    if (err) {
       return console.error(err);
    }
    const map = JSON.parse(data.slice(data.indexOf("["), data.length));

    const collisionMap = generate2dArray(constants.mapWidth * constants.mapScale, constants.mapHeight * constants.mapScale, 1);
    generateMap(map, collisionMap);

    fs.writeFile('../collisionMap.js', 'const collisionMap = ' + JSON.stringify(collisionMap), function(err) {
        if (err) {
            return console.error(err);
        }
    });
});


function generateMap(map, collisionMap){
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