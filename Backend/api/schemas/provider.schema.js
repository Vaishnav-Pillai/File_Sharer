const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    "name": {type: String, required: true},
    "path": {type: String, required: true, unique: true},
    "downloadContent": {type: Number, required: true, default: 0}
});

module.exports = {fileSchema}