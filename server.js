var express = require('express');
var app = express();
app.use("/styles", express.static(__dirname + '/styles'));

app.listen(3000, function () {
	console.log('listening on port 3000');
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});
