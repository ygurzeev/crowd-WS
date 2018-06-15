var uniqid = require('uniqid');
var fs = require('fs');
var utils = {
    renameFile: function (path, filename) {
        var filenameArray = filename.split('.');
        var newFirstName = uniqid();
        var newName = newFirstName+'.'+filenameArray[filenameArray.length-1];
        var oldPath = path+'/'+filename;
        var newPath = path+'/'+newName;
        fs.renameSync(oldPath,newPath);
        return newName;
    }

}

module.exports = utils;