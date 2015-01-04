
var items = [];

function sanitizeParams(id, res) {
    if (isNaN(id)) {
        res.send('Item id not valid');
        res.statusCode = 400;
        return false;
    }
    return true;
}

exports.listAll = function (req, res) {
    items.forEach(function (item, i) {
        res.write(i + '. ' + item + '\n');
    });
    res.end();
}

exports.listOne = function (req, res) {
    if (sanitizeParams(req.params.index, res)) {
        if (items[req.params.index]) {
            res.send("getting " + req.params.index);
        } else {
            res.send("item not found");
        }
    }
}

exports.create = function (req, res) {
    if (!req.param('item')) {
        res.send('Item not valid');
        res.statusCode = 400;
    } else {
        items.push(req.param('item'));
        res.send("adding " + req.param('item'));
    }
}

exports.update = function (req, res) {
    if (sanitizeParams(req.params.index, res)) {
        if (items[req.params.index] && req.param('item')) {
            items[req.params.index] = req.param('item');
            res.send("putting " + req.params.index);
        } else {
            res.send("item not found");
        }
    }
}

exports.delete = function (req, res) {
    if (sanitizeParams(req.params.index, res)) {
        if (items[req.params.index]) {
            items.splice(req.params.index, 1);
            res.end('Item deleted successfully');
        } else {
            res.send("item not found");
        }
    }
}

console.log("demonstrating module.exports", module.exports);