var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Calculator = require('./js/SleepCalculator.js');
var MongoClient = require('mongodb').MongoClient;
var db = null;
var dbuser = 'drakeywakey';
var dbpassword = 'drakobian';
var mongoUrl = 'mongodb://' + dbuser + ':' + dbpassword + '@ds145188.mlab.com:45188/sleep-times';

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

MongoClient.connect(mongoUrl, function (err, datab) {
	if (err) {
		return console.error(err);
	}
	else {
		db = datab;
		app.listen(3000, function () {
			console.log('listening on port 3000');
		});
	}
});

app.get('/', function (req, res) {
	res.render('./index.ejs', { sleptHours: false });
});

app.post('/sleepEntry', function (req, res) {
	var data = req.body;
	data.date = new Date().toDateString();

	calculator = new Calculator();
	calculator.calculateSleep(data);

	db.collection('test').save(data, function (err, result) {
		if (err) {
			return console.error(err);
		}
		else {
			console.log('saved to the db');
		}
	});

	res.render('./index.ejs', calculator);
});
