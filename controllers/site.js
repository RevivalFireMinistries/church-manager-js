/* put controller actions here */

exports.index = function(req, res){
    res.send("Ndeipi!");
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}