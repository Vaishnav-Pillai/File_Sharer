const mongoose = require('mongoose');
const { fileSchema } = require('../schemas/provider.schema');

//Create provider model

const File = mongoose.model('File', fileSchema);

module.exports = { File }