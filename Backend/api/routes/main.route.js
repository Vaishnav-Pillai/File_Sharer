var express = require('express');
var router = express.Router();
const mainController = require('../controller/main.controller');
var upload = require('../utils/upload');

//HTTP Verbs : Post - Create, Get - Read, Put - Update, Delete

router.post('/upload', upload.single('file'), mainController.create);

router.get('/upload/:id',mainController.readOne);

module.exports = router;