var ffmpeg = require('fluent-ffmpeg');

var videoService = {
    foo: function () {
        console.log("hello");
    },

    handleVideoUpload: function(path) {

    },
    moveFile: function(path) {

    },

    generateMaster: function(path, filename){

        var proc = new ffmpeg();

        proc.addInput(path+filename)
            .on('start', function(ffmpegCommand) {
                /// log something maybe
            })
            .on('progress', function(data) {
                /// do stuff with progress data if you want
            })
            .on('end', function() {
                /// encoding is complete, so callback or move on at this point
            })
            .on('error', function(error) {
                /// error handling
            })
            .outputOptions(['-c:v libx264', '-r 30', '-pix_fmt yuv420p'])
            .output(path+'master.mp4')
            .run();
    }
}

module.exports = videoService;