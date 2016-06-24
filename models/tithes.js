var connection = require('./../db/connection');


function Tithe() {

    this.create = function(tithe, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('insert into rfm_tithe set ?', tithe, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Tithe creation failed'});
                } else {
                    res.send({status: 0, message: 'Tithe created successfully'});
                }
            });
        });
    };

}
module.exports = new Tithe();