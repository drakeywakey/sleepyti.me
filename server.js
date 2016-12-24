var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Calculator = require('./js/SleepCalculator.js');
var MongoClient = require('mongodb').MongoClient;
var dbuser = 'drakeywakey';
var dbpassword = 'drakobian';
var mongoUrl = 'mongodb://' + dbuser + ':' + dbpassword + '@ds145188.mlab.com:45188/sleep-times';

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(3000, function () {
	console.log('listening on port 3000');
});

app.get('/', function (req, res) {
	res.render('./index.ejs', { sleptHours: false });
});

app.post('/sleepEntry', function (req, res) {
	var data = {};

	calculator = new Calculator();
	calculator.calculateSleep(req.body);

	res.render('./index.ejs', calculator);
});

MongoClient.connect(mongoUrl, function (err, db) {
	if (err) {
		console.error(err);
	}
	else {
		console.log(db);
	}
});
