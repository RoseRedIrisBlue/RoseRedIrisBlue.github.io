var MongoClient = require('mongodb').MongoClient; 

var url = "mongodb://heroku_5vqhhd53:t04tud6lh8g63dnjkodtn0afhe@ds347917.mlab.com:47917/heroku_5vqhhd53";

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Database created");
	db.close();
});