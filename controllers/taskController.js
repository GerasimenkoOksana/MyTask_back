const model = require("../models/task");
const lastUpdate = require("./stateController");

// Create => POST
exports.post = function (req, res) {
    console.log ("POST start");
    const element = new model (req.body);
    element.save (function (err) {
        if(err) { console.log(err); return err;}
        lastUpdate.set();
        return res.send(element);
    })
};

// Read => GET:user_id
exports.get = function (req, res) {
    let {user_id} = req.params;
    console.log ("GET start");
    model.find({user_id : user_id},
        function (err, data) {
            if(err) { console.log(err); return err;}
            res.json(data);
        });
}
// Read => GET:column_id
exports.get_column = function (req, res) {
    let {column_id} = req.params;
    console.log ("GET start");
    model.find({column_id: column_id},
        function (err, data) {
            if(err) { console.log(err); return err;}
            res.json(data);
        });
}
// Update => PUT
exports.put = function (req, res) {
    console.log ("PUT start");
    const element = new model (req.body);
    model.findByIdAndUpdate(
        req.body._id,
        element,
        {},
        function (err, result) {
            if (err) {console.log(err); res.send(err);}
            lastUpdate.set();
            res.send(result);
        }
    );
}

// Delete = >DELETE
exports.delete = function (req, res) {
    model.findByIdAndDelete(
        req.body._id,
        {},
        function (err) {
            if (err) res.send(err);
            lastUpdate.set();
            res.sendStatus(200);
        }
    );
}