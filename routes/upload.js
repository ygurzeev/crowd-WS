var express = require('express');
var router = express.Router();

var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();


router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/", function(req,res){
    if(req.files){
        var file = req.files.filename,
            filename = req.files.filename.name;
        file.mv('./uploads/'+filename, function(err){
            if(err){
                console.log(err);
                res.send("error occured");
            }
            else{
                var fileMetadata;
                ffmpeg.ffprobe('./uploads/'+filename, function(err, metadata) {
                    fileMetadata = metadata;
                    var response = {
                        'location':'./uploads/'+filename,
                        'creationDate':fileMetadata.format.tags.creation_time
                    };

                    global.globalDb.collection("videos").insertOne(response, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                    });

                    res.json(response);
                });


            }
        });
    }
});

module.exports = router;