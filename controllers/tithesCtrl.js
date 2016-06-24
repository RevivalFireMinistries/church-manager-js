var tithes = require('./../models/tithes');

exports.create = function(req,res){
    var t = req.body;
    t.member = parseInt(req.params.id);
    t.datecreated = new Date(t.datecreated);
    tithes.create(t,res);
}