var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Calculator = require('./js/SleepCalculator.js');

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(3000, function () {
	console.log('listening on port 3000');
});

app.get('/', function (req, res) {
	res.render(__dirname + '/views/index.ejs', {});
});

app.post('/sleepEntry', function (req, res) {
	var data = {};

	calculator = new Calculator();
	calculator.calculateSleep(req.body);

	data.sleptHours = calculator.sleptHours;
	data.sleptMinutes = calculator.sleptMinutes;

	res.render(__dirname + '/views/index.ejs', data);
});
