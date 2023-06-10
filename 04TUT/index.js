const logEvents = require('./logEvent');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { };

// initialise object
const myEmitter = new MyEmitter();

// add listener for log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    // emit event
    myEmitter.emit('log', 'Log Event emitted');
}, 2000);