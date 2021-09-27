const fs = require('fs');

module.exports.generate2dArray = (width, height, fill=undefined)=>{
    let arr = new Array(width);
    for(let i = 0; i < width; i++){
        arr[i] = new Array(height).fill(fill);
    }
    return arr;
}

module.exports.perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}

module.exports.getMapFromFile = (path)=>{
    let arr;
    fs.readFile(path, (err, data)=>{
        if (err) {
           return console.error(err);
        }
        arr = JSON.parse(data.slice(data.indexOf("["), data.length));
        // arr2 = new Array(mapData.length);
        // for(let i = 0; i < mapData.length; i++){
        //     arr2[i] = new Array(mapData[i].length);
        //     for(let j = 0; j < mapData[i].length; j++)
        //         arr2[i][j] = mapData[i][j];
        // }
        // l.l1 = mapData.length;
        // l.l2 = mapData[0].length;
    });
    console.log(arr.length);
    return 1;
}