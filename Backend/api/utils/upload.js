const multer = require('multer');

const upload = multer({ dest: './api/controller/uploads/' });

module.exports = upload;