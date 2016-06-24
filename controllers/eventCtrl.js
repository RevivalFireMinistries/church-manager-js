var event = require('./../models/event');

exports.create = function(req,res){
    var evt = req.body;
    evt.eventDate = new Date(evt.eventDate);
    evt.assembly = parseInt(req.params.id);
    event.create(evt,res);
}
exports.getEvent = function(req, res){
    event.getEvent(req.params.id,res)
}