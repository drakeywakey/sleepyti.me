var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use("/styles", express.static(__dirname + '/styles'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
	console.log('listening on port 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/sleepEntry', function (req, res) {
	console.log(req.body);
});
