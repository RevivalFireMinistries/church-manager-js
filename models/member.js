var connection = require('./../db/connection');
var cq = require('./../db/connection-q');



function Member() {
    this.getAssemblyMembers = function(id,res) {
        logger.debug("the id : "+id);
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('select * from rfm_member where assembly = ?',[id], function(err, rows, fields) {
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
                res.send(error);
            });
    };

    this.getById = function(id,res) {
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('select * from rfm_member where id = ?',[id], function(err, rows, fields) {
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
                res.send(error);
            });
    };
    this.getById = function(id,callback) {
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('select * from rfm_member where id = ?',[id], function(err, rows, fields) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(rows);
                });
                return deferred.promise;
            })
            .then(function(result){
                callback(result);
            })
            .catch(function(error){
                callback(null);
            });
    };

    this.create = function(member, res) {
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('insert into rfm_member set ?', member, function(err, rows) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(member);
                });
                return deferred.promise;
            })
            .then(function(member){
                cq.connect()
                    .then(function(con){
                        var account = {};
                        account.member_id = member.id;
                        con.query('insert into rfm_account set ?', account, function(err, rows) {
                            if (err) {
                                console.log("Error: " + err);
                                res.send({status: 1, message: 'Member creation failed'});
                            }
                            res.send({status: 0, message: 'Member created successfully'});
                        });
                    })
            })
            .catch(function(error){
                res.send({status: 1, message: 'Member creation failed'});
            });
    };

    this.update = function(member, res) {
        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('update rfm_member set ? where id = ?', [member, member.id], function(err, rows) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(rows);
                });
                return deferred.promise;
            })
            .then(function(result){
                res.send({status: 0, message: 'Member updated successfully'});
            })
            .catch(function(error){
                res.send({status: 1, message: 'Member update failed'});
            });
    };


    this.softDelete = function(id, res) {

        cq.connect()
            .then(function(con){
                var deferred = q.defer();
                con.query('update rfm_member set status = ? where id = ?', ["Deleted", id], function(err, rows) {
                    if (err) {
                        console.log("Error: " + err);
                        deferred.reject(err)
                    }
                    deferred.resolve(rows);
                });
                return deferred.promise;
            })
            .then(function(result){
                res.send({status: 0, message: 'Member deleted successfully'});
            })
            .catch(function(error){
                res.send({status: 1, message: 'Member delete failed'});
            });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('delete from rfm_member where id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Failed to delete'});
                } else {
                    res.send({status: 0, message: 'Deleted successfully'});
                }
            });
        });
    };
}
module.exports = new Member();