var member = require('./../models/member');


exports.getAssemblyMembers = function(req, res){
    member.getAssemblyMembers(req.params.id,res)
}

exports.create = function(req,res){
    var m = req.body;
    m.assembly = parseInt(req.params.id);
    m.datecreated = new Date();
    m.status = "Active";
    member.create(m,res);
}

exports.update = function(req,res){
    logger.info("now updating member")
    var m = req.body;
    member.update(m,res);
}

exports.delete = function(req,res){ //this is a soft delete
    logger.info("now deleting member")
    member.softDelete(req.params.memberid,res);
}