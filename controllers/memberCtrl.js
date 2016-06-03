var member = require('./../models/member');


exports.getAssemblyMembers = function(req, res){
    member.getAssemblyMembers(req.params.id,res)
}