var connection = require('./../db/connection');


function Member() {
    this.getAssemblyMembers = function(id,res) {
        logger.debug("the id : "+id);
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_member where assembly = ? ',[id], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.getById = function(id,res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('select * from rfm_member where id = ?', [id], function(err, result) {
                con.release();
                res.send(result);
            });
        });
    };

    this.create = function(member, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('insert into rfm_member set ?', member, function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Member creation failed'});
                } else {
                    res.send({status: 0, message: 'Member created successfully'});
                }
            });
        });
    };

    this.update = function(member, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('update rfm_member set ? where id = ?', [member, member.id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Member update failed'});
                } else {
                    res.send({status: 0, message: 'Member updated successfully'});
                }
            });
        });
    };


    this.softDelete = function(id, res) {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query('update rfm_member set status = ? where id = ?', ["Deleted", id], function(err, result) {
                con.release();
                if (err) {
                    res.send({status: 1, message: 'Member delete failed'});
                } else {
                    res.send({status: 0, message: 'Member deleted successfully'});
                }
            });
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