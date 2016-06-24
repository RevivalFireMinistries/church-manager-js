var connection = require('./../db/connection');
var cq = require('./../db/connection-q');


function Event() {


    this.create = function(event, res) {
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('insert into rfm_event set ?', event, function(err, rows) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(rows);
                });
                return deferred.promise;
            })
            .then(function(result){
                res.send({status: 0, message: 'Event created successfully'});
            })
            .catch(function(error){
                res.send({status: 1, message: 'Event creation failed'});
            });

    };


    this.getEvent = function(id,res) {

        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('select * from rfm_event where id = ?', [id], function(err, rows) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(rows);
                });
                return deferred.promise;
            })
            .then(function(result){
                res.send(result);
            })
            .catch(function(error){
                res.send({status: 1, message: 'Failed to get event'});
            });
        
    };


}
module.exports = new Event();