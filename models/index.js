const conn = require('../config/db.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = conn.url;
db.promotions = require('./promotions.js')(mongoose);

module.exports = db;