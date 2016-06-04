var user = require('./../models/user');

exports.authenticate = function(req, res){
    var uname = req.body.username;
    var password = req.body.password;

    user.getByUsername(uname,function(result){
        if(!(_.isNull(result))){
            if(_.isEqual(uname,result[0].username) && _.isEqual(password,result[0].password)){
                res.send({status: 0, user: result[0]});
                logger.info("OK - Login successful : "+uname);
                return;
            }
        }
        res.send({status: 1, message: 'Login failed'});
        logger.warn("Invalid credentials...login failed! "+uname);
    });

}