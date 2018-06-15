var express = require('express');
var router = express.Router();
var upload = require('express-fileupload');

var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(__dirname+'/index.html');
});

module.exports = router;
