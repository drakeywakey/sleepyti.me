var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var Calculator = require('./js/SleepCalculator.js');
var MongoClient = require('mongodb').MongoClient;
var db = null;
var dbuser = 'drakeywakey';
var dbpassword = 'drakobian';
var mongoUrl = 'mongodb://' + dbuser + ':' + dbpassword + '@ds145188.mlab.com:45188/sleep-times';

app.use('/resources', express.static(__dirname + '/resources'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(mongoUrl, function (err, database) {
	if (err) {
		return console.error(err);
	}
	else {
		db = database;
		app.listen(3000, function () {
			console.log('listening on port 3000');
		});
	}
});

app.get('/', function (req, res) {
	db.collection('sleep-times').find().toArray(function(err, results) {
		if (err) {
			console.error(err);
		}
		else {
			// oh boy. this is getting gross.
			// Couldn't figure out a good way to get the data from here to the client js for d3 to use
			// soooooo we're gonna save the data to a file, and read from the file on the client ://// groooossss
			fs.writeFile(__dirname + '/resources/test.json', JSON.stringify(results), function (error) {
				if (error) {
					console.error(error);
				}
				else {
					res.sendFile(__dirname + '/views/index.html');
				}
			});
		}
	});
});

app.post('/sleepEntry', function (req, res) {
	var data = req.body;
	data.date = new Date().toDateString();

	calculator = new Calculator();
	calculator.calculateSleep(data);
	data.sleptHours = calculator.sleptHours;
	data.sleptMinutes = calculator.sleptMinutes;

	db.collection('sleep-times').save(data, function (err, result) {
		if (err) {
			return console.error(err);
		}
		else {
			console.log('saved', data, 'to the db');
		}
	});
	res.redirect('/');
	//res.render('./index.ejs', data);
});
