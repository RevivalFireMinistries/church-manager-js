var member = require('./../models/member');


exports.getAssemblyMembers = function(req, res){
    member.getAssemblyMembers(req.params.id,res)
}

exports.create = function(req,res){
    var m = req.body;
    m.assembly = parseInt(req.params.id);
    member.create(m,res);
}

exports.update = function(req,res){
    logger.info("now updating member")
    var m = req.body;
    member.update(m,res);
}