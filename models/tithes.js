var connection = require('./../db/connection');
var member = require('./../models/member');


function Tithe() {

    this.create = function(tithe, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('insert into rfm_tithe set ?', tithe, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Tithe creation failed'});
                    logger.error("Error : "+err);
                } else {
                    var m = member.getById(tithe.member,function(data){
                        var m = data[0];
                        tithe.name = m.firstName;
                        sms.sendSMS(util.getTitheSMSText(tithe),m.phone,function(resp){
                            logger.info(resp);
                            res.send({status: 0, message: 'Tithe captured successfully'});
                        });
                    });
                 }
            });
        });
    };

}
module.exports = new Tithe();