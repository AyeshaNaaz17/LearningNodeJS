// const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join( __dirname, "files", "starter.txt"), "utf8");
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, "files", "starter.txt")); // to delete the file, here starter.txt

        await fsPromises.writeFile(path.join(__dirname, "files", "promiseWrite.txt"), data);
        await fsPromises.appendFile(path.join(__dirname, "files", "promiseWrite.txt"), "\n\nNice to meet you!");
        await fsPromises.rename(path.join(__dirname, "files", "promiseWrite.txt"), path.join(__dirname, "files", "promiseComplete.txt"));
        const newData = await fsPromises.readFile(path.join( __dirname, "files", "promiseComplete.txt"), "utf8");
        console.log(newData);
    
    } catch (err) {
        console.log(err);
    }
}

fileOps();

/*
// '.files/starter.txt'
fs.readFile(path.join( __dirname, "files", "starter.txt"), "utf8", (err, data) => {
    if (err) throw err;
    console.log(data); // if no utf8, then data.strigfy
})

 -- // vanilla node
console.log("Hello....")

fs.writeFile(path.join( __dirname, "files", "reply.txt"), "Nice to meet you!", (err, data) => {
    if (err) throw err;
    console.log("Write Complete"); // if no utf8, then data.strigfy

    // can modify if file exists, if doesn't exist it will be created
    fs.appendFile(path.join( __dirname, "files", "reply.txt"), "\n\nModifying Reply", (err, data) => {
        if (err) throw err;
        console.log("Append Complete"); // if no utf8, then data.strigfy

        fs.rename(path.join( __dirname, "files", "reply.txt"), path.join(__dirname, "files", "newReply.txt"), (err, data) => {
            if (err) throw err;
            console.log("Rename Complete"); // if no utf8, then data.strigfy
        })

    })

})

*/


process.on("uncaughtException", err => {
    console.error('There was an uncaught error: ${err}');
    process.exit(1);
})

