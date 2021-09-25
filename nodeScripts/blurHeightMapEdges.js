const fs = require('fs');
const Constants = require('./constants');
const constants = Constants.constants;
const {generate2dArray} = require('./helperFunctions');

fs.readFile('../map.js', (err, data)=>{
    if (err) {
       return console.error(err);
    }
    const map = JSON.parse(data.slice(data.indexOf("["), data.length));

    const smoothMap = generate2dArray(constants.mapWidth * constants.mapScale, constants.mapHeight * constants.mapScale, 1);
    blurMap(map, smoothMap);

    fs.writeFile('../collisionMap.js', 'const map = ' + JSON.stringify(smoothMap), function(err) {
        if (err) {
            return console.error(err);
        }
    });
});