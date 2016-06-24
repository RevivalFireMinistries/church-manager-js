var mysql = require('mysql');

function Connection() {

this.connect = function() {
    var deferred = q.defer();
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password85',
        database: 'churchmanager'
    });

    connection.connect(function(err) {
        if (err) {
            logger.error('error connecting: ' + err.stack);
            deferred.reject(err);
        }
        deferred.resolve(connection);
    });
    return deferred.promise;
}

this.runQuery = function (query) {
    var deferred = q.defer();
    connection.query(query, function(err, rows, fields) {
        if (err) {
            console.log("Error: " + err);
            deferred.reject(err)
        }
        deferred.resolve(rows);
    });
    return deferred.promise;
}
}

module.exports = new Connection();