const notes = require('express').Router();

// helper util for read and write files
const {readFromFile} = require('../helpers/fsUtils');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;