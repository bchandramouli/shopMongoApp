var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema ({
	item: String
});

var items = [];

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.use(bodyParser.urlencoded({
	extended: true
}));

// gets all items, ie http GET localhost:5000
app.get('/', function(req, res){
	items.forEach(function (item, i) {
		res.write(i + '. ' + item + '\n');
	});
	res.end();
});

// gets a single item, ie the second item http GET localhost:5000/1
app.get('/:index', function(req, res){
	if (isNaN(req.params.index)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.index]) {
		res.send("getting "+req.params.index);
	}
	else {
res.send("item not found");
}
});

// adds and item, ie http --form POST localhost:5000 item='oranges'
app.post('/', function(req, res){
	if (!req.param('item')) {
		res.send('Item not valid');
		res.statusCode = 400;
	} else {
		items.push(req.param('item'));
		res.send("adding " + req.param('item'));
	}
});

// updates an item, ie http --form PUT localhost:5000/1 item='chocolate'
app.put('/:index', function(req, res){
	if (isNaN(req.params.index)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.index] && req.param('item')) {
		items[req.params.index] = req.param('item');
		res.send("putting "+req.params.index);
	}
	else {
		res.send("item not found");
	}
});

// deletes an item, ie http DELETE localhost:5000/1
app.delete('/:index', function(req, res){
	if (isNaN(req.params.index)) {
		res.send('Item id not valid');
		res.statusCode = 400;
	}
	else if (items[req.params.index]) {
		items.splice(req.params.index, 1);
		res.end('Item deleted successfully');
	}
	else {
		res.send("item not found");
	}
});

mongoose.connect('mongodb://localhost/Users/mouli/webFrameworks/mDB');
var db = mongoose.connection;
db.on('error', function callback() {
	console.error('connection error');
});
db.once('open', function callback() {
	console.log('connection success');
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('listening on '+port);
});
