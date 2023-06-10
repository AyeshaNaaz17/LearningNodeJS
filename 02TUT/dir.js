const fs = require('fs');

// to create the directory, with a condition if it does not exist, here is 'new' is the directory name
if (!fs.existsSync('./new')){
    fs.mkdir("./new", (err) => {
        if (err) throw err;
        console.log("DIRECTORY created");
    });
}

// to remove the directory, with a condition if it exists, here is 'new' is the directory name
if (fs.existsSync('./new')){
    fs.rmdir("./new", (err) => {
        if (err) throw err;
        console.log("DIRECTORY removed");
    });
}