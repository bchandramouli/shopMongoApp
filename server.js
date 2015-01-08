
//var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var shopList = require('./list.js');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

app.use(bodyParser.urlencoded({
    extended: true
}));

// gets all items, ie http GET localhost:5000
app.get('/', shopList.listAll);

// gets a single item, ie the second item http GET localhost:5000/1
app.get('/:index', shopList.listOne);

// adds and item, ie http --form POST localhost:5000 item='oranges'
app.post('/', shopList.create);

// updates an item, ie http --form PUT localhost:5000/1 item='chocolate'
app.put('/:index', shopList.update);

// deletes an item, ie http DELETE localhost:5000/1
app.delete('/:index', shopList.delete);

app.set('Shopping App', 'Uses mongoose');

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
    //mongoose.connect('mongodb://localhost/Users/mouli/webFrameworks/mDB/mydb');
    mongoose.connect('mongodb://localhost/mydb');
    app.use(function (err, req, res) {
        // error handling middleware
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
} else {
    mongoose.connect('mongodb://foo:blah@ds031271.mongolab.com:31271/shopping_app');
    app.use(function (err, req, res) {
        res.status(500).send('Sorry we are fixing this issue!');
    });
}


var db = mongoose.connection;
db.on('error', function callback() {
    console.error('connection error');
});
db.once('open', function callback() {
    console.log('connection success');
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('listening on ' + port);
});
