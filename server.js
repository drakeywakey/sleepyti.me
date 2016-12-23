var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
	console.log('listening on port 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/sleepEntry', function (req, res) {
	console.log(req.body);

	//assuming the user entered valid data -- wake up time set to after sleep time
	//Don't just assume that in the future -- add input validation soon
	//also this doesn't belong in the server code. Move it soon
	//calculate time slept.
	var msPerHour = 1000 * 60 * 60;
	var msPerMinute = 1000 * 60;

	var sleepDay = req.body.sleepDay;
	var sleepHour = req.body.sleepHour;
	var sleepMeridian = req.body.sleepMeridian;
	var sleepMinute = req.body.sleepMinute;

	var wakeHour = req.body.wakeHour;
	var wakeMeridian = req.body.wakeMeridian;
	var wakeMinute = req.body.wakeMinute;

	var sleepTime = new Date();
	var wakeTime = new Date();

	var sleptHours = null;
	var sleptMinutes = null;

	if (sleepDay === 'yesterday') {
		sleepTime.setDate(sleepTime.getDate() - 1);
	}

	sleepTime.setHours(sleepMeridian === 'AM' ? sleepHour : parseInt(sleepHour) + 12);
	sleepTime.setMinutes(sleepMinute);

	wakeTime.setHours(wakeMeridian === 'AM' ? wakeHour : parseInt(wakeHour) + 12);
	wakeTime.setMinutes(wakeMinute);

	sleptHours = Math.floor((wakeTime - sleepTime) / msPerHour);
	sleptMinutes = Math.round((wakeTime - sleepTime) / msPerMinute) % 60;
	//var sleptTime = new Date(wakeTime - sleepTime);
	//sleptHours = wakeTime.getHours() - sleepTime.getHours();

	/*if (sleptHours < 0) {
		sleptHours += 24;
	}

	sleptMinutes = wakeTime.getMinutes() - sleepTime.getMinutes();

	if (sleptMinutes < 0) {
		sleptMinutes += 60;
	}*/

	console.log('You slept for', sleptHours, 'hours and', sleptMinutes, 'minutes.');
});
