const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf8" });

const ws = fs.createWriteStream("./files/new-lorem.txt");

/* 
// to listen the data coming in
rs.on("data", (dataChunk) => {
    ws.write(dataChunk);
})
*/

//or

rs.pipe(ws);