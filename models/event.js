var connection = require('./../db/connection');


function Event() {


    this.create = function(event, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('insert into rfm_event set ?', event, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Event creation failed'});
                } else {
                    res.send({status: 0, message: 'Event created successfully'});
                    email.send();
                }
            });
        });
    };


    this.getEvent = function(id,res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_event where id = ?', [id], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };


}
module.exports = new Event();