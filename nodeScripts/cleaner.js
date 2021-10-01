const fs = require('fs');

fs.unlink("../map.js", (err) => {
    if (err) {
      console.error(err)
      return
    }
});

fs.unlink("../collisionMap.js", (err) => {
    if (err) {
      console.error(err)
      return
    }
});

fs.unlink("../foliageMap.js", (err) => {
    if (err) {
      console.error(err)
      return
    }
});