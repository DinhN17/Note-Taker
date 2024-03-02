const notes = require('express').Router();

// helper util for read and write files
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

// POST Route for save note
notes.post('/', (req, res) => {
    console.log(req.body);

    const {title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Note ${newNote.title} saved successfully`);
    } else {
        res.errored(`Error in saving note ${newNote.title}`);
    }
});

module.exports = notes;