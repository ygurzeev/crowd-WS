var express = require('express');
var router = express.Router();
var request = require('request');
var ObjectID = require('mongodb').ObjectID;
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');
var videoService = require('../services/videoService.js');
var utils = require('../services/utils.js');

router.get('/', function(req, res, next) {

    global.globalDb.collection("events").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});
router.get('/:id', function(req, res, next) {
    var query = {_id:new ObjectID(req.params.id)};
    global.globalDb.collection("events").findOne(query,function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});

router.get('/:id/videos', function(req, res, next) {
    var query = {_id:new ObjectID(req.params.id)};
    global.globalDb.collection("events").findOne(query,{ _id: 0, videos: 1 },function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});

router.post('/', function(req, res, next) {

    console.log(req.body);
    global.globalDb.collection("events").insertOne(req.body,function(err, result) {
        if (err) throw err;
        res.send(result);
    });

});


router.post("/:eventId/upload", function(req,res){
    if(req.files){
        var file = req.files.fileKey,
            filename = req.files.fileKey.name;
        // create directory for this event if does not exists
        var dir = './uploads/'+req.params.eventId;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        file.mv(dir+'/'+filename, function(err){
            if(err){
                console.log(err);
                res.send("error occured");
            }
            else{
                filename = utils.renameFile(dir,filename);
                var theVideo = {
                    'location':'/uploads/'+req.params.eventId+'/'+filename,
                    'creationDate':req.body.creationTime
                };
                global.globalDb.collection("events").updateOne({_id:new ObjectID(req.params.eventId)},{ $push: { "videos":theVideo} }, function(err, res1) {
                    if (err) throw err;
                    console.log("1 document updated");
                    videoService.generateMaster(dir, filename);
                    res.json(theVideo);
                });
            }
        });
    }
});
module.exports = router;