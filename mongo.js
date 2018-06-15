var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Guns Show", location: "Highway 37", date: new Date() };
    dbo.collection("events").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});



db.createUser(
    {
        user: "yoni",
        pwd: "1234",
        roles: [
            { role: "readWriteAnyDatabase", db: "admin" }
        ]
    }
)