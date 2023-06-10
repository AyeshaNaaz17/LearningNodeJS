// only using format function from whole date-fns module which is downloaded from npm package
const { format } = require('date-fns');
// alias for v4 is uuid
const { v4: uuid } = require('uuid');

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");


// `${}`--> template literal
const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        // testing
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log(uuid());

module.exports = logEvents;