// only using format function from whole date-fns module which is downloaded from npm package
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
console.log(uuid());