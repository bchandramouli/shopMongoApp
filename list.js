/* Instead of the array use the DB... 
 *     var items = [];
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    item: String
});

var Item = mongoose.model('Item', itemSchema);

function sanitizeParams(id, res) {
    if (isNaN(id)) {
        res.send('Item id not valid');
        res.statusCode = 400;
        return false;
    }
    return true;
}

exports.listAll = function (req, res) {
    Item.find(function (err, items) {
        if (err) return (console.error(err));
        res.send(items);
    });
    /*
     * items.forEach(function (item, i) {
     *    res.write(i + '. ' + item + '\n');
     * });
     */
}

exports.listOne = function (req, res) {
    Item.find({'_id': mongoose.Types.ObjectId(req.params.index)}, 
                function (err, item) {
        if (err) return (console.error(err));
        res.send(item);
    });
    /*
     * if (items[req.params.index]) {
     *   res.send("getting " + req.params.index);
     * } else {
     *   res.send("item not found");
     * }
     */
}

exports.create = function (req, res) {
    if (!req.param('item')) {
        res.send('Item not valid');
        res.statusCode = 400;
    } else {
        /* Instead of pushing to local array send it to the DB...
         *     items.push(req.param('item'));
         */
        var item = new Item({'item': req.param('item')});
        console.log(item);
        item.save(function (err, item) {
            if (err) return (console.error(err));
            res.send("adding " + item);
        });
    }
}

exports.update = function (req, res) {
    Item.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.index),
                           {'item': req.param('item')}, 
                           function (err, item) {
                            if (err) return(console.error(err));
                            res.send("updated to " + item);
                           });
        /*
         * if (items[req.params.index] && req.param('item')) {
         *   items[req.params.index] = req.param('item');
         *   res.send("putting " + req.params.index);
         * }
         */ 
        
}

exports.delete = function (req, res) {
    Item.remove({'_id': mongoose.Types.ObjectId(req.params.index)},
                function(err, item) {
                    if (err) return(console.error(err));
                    console.log(item);
                    res.send({});
                });
    
    /*
     * if (items[req.params.index]) {
     *     items.splice(req.params.index, 1);
     *     res.end('Item deleted successfully');
     * } else {
     *     res.send("item not found");
     * }
     */
}

console.log("demonstrating module.exports", module.exports);
