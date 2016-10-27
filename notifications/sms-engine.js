var http = require('http');
var fs    = require('fs');
var util  = require('util');

module.exports = {
    sendSMS: function (message,mobileNumber,callbackFunction) {
        var options = {
            host: 'http://www.winsms.co.za',
            path: '/api/batchmessage.asp?User=luke@rfm.org.za&Password=password85&message='+
            encodeURIComponent(message)+'&Numbers='+mobileNumber
        };
        callback = function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log(str);
                callbackFunction(str);
            });
        }

        http.request(options, callback).end();
    },

    sendMessage: function (message,mobileNumber) {
        var url = 'http://www.winsms.co.za/api/batchmessage.asp?User=luke@rfm.org.za&Password=password85&message='+
            encodeURIComponent(message)+'&Numbers='+mobileNumber;
        fs.open(url, 'w', function(err, fd) {
            for (var i = 0; i < 100; i++)
                fs.write(fd, util.format('line %d\n', i));
            fs.close(fd);
        });
    }
}