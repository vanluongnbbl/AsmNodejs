const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express-demo')

db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

module.exports = db;
// module.exports = mongoose;
