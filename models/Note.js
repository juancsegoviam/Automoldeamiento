const {Schema, model} = require('mongoose');

const noteSchema = new Schema({
    tiempo: Array,
    evento: Array
});

const Note =  model('Note', noteSchema);

module.exports = Note;