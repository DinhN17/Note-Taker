const fs = require('fs');
const util = require('util');

// readFile
const readFromFile = util.promisify(fs.readFile);


module.exports = { readFromFile};