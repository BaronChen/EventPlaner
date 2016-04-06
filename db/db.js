var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/travelplan');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongo db connected!")
});
module.exports = db;

