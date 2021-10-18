let lastUpdate;
exports.get = function (req, res){
    res.send(lastUpdate);
}

exports.set = function (){
    lastUpdate = new Date();
}