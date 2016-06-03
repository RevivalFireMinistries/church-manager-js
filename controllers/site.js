/* put controller actions here */

exports.index = function(req, res){
    res.send([{name:'name1'}, {name:'name2'}, {name:'name3'}]);
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}