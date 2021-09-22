const fs = require("fs");
const Constants = require("./constants");
const constants = Constants.constants;

fs.readFile('../map.js', (err, data)=>{
    if (err) {
       return console.error(err);
    }
    const map = JSON.parse(data.slice(data.indexOf("["), data.length));

    const collisionMap = new Array(map.length * constants.mapScale);

    for(let i = 0; i < map[0].length; i++){
        collisionMap[i] = new Array(map[i].length * constants.mapScale).fill(0);
    }
    generateMap(map, collisionMap);

    fs.writeFile('../collisionMap.js', 'const collisionMap = ' + JSON.stringify(collisionMap), function(err) {
        if (err) {
            return console.error(err);
        }
    });
});


function generateMap(map, collisionMap){
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[i].length; j++){
            if(map[i][j] >= .0001 && map[i][j] <= .75){
                for(let k = 0; k < constants.mapScale; k++){
                    for(let l = 0; l < constants.mapScale; l++){
                        if(i * constants.mapScale + k >= collisionMap.length || j * constants.mapScale + l >= collisionMap[i].length){
                            console.log(`i: ${i * constants.mapScale + k} j: ${j * constants.mapScale + l}`)
                        }
                        collisionMap[i * constants.mapScale + k][j * constants.mapScale + l] = 1;
                    }
                }
            }else{
                for(let k = 0; k < constants.mapScale; k++){
                    for(let l = 0; l < constants.mapScale; l++){
                        collisionMap[i * constants.mapScale + k][j * constants.mapScale + l] = 0;
                    }
                }
            }
        }
    }
}
