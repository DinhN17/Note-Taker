const notes = require('express').Router();

// helper util for read and write files
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

// generate unique id
const {v4: uuidv4} = require('uuid');

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
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');
        res.json(`Note ${newNote.title} saved successfully`);
    } else {
        res.errored(`Error in saving note ${newNote.title}`);
    }
});

// DELETE Route for delete note
notes.delete('/:id', (req, res) => {
    console.log(req.params.id);

    if (req.params.id) {
        const requestedId = req.params.id;

        readFromFile('./db/db.json')
        .then((data) => {
        let notes = JSON.parse(data);

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element.id === requestedId) {
                notes.splice(index, 1);
                break;
            };
        };

        writeToFile('./db/db.json', notes);
        res.json(`Note Id ${requestedId} deleted successfully`);
    });
    } else {
        res.errored(`Error in deleting note id ${requestedId}`);
    };
})

module.exports = notes;