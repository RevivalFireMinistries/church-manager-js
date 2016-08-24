var connection = require('./../db/connection');


function Member() {
    this.getAssemblyUsers = function(id,res) {
        logger.debug("the id : "+id);
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_username where assembly = ?',[id], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getByUsername = function(username,callback) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_user where username = ?', [username], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };


    this.getByAssembly = function(assemblyId,callback) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_user where assembly = ?', [assemblyId], function(err, result) {
                con.release();
                callback(result);
            });
        });
    };

    this.create = function(user, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('insert into rfm_user set ?', user, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'User creation failed'});
                } else {
                    res.send({status: 0, message: 'User created successfully'});
                }
            });
        });
    };

    this.update = function(user, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('update rfm_user set ? where username = ?', [user, user.username], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'User update failed'});
                } else {
                    res.send({status: 0, message: 'User updated successfully'});
                }
            });
        });
    };

    this.delete = function(username, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('delete from rfm_user where id = ?', [username], function(err, result) {
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