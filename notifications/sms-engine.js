var http = require('http');
var fs    = require('fs');
var util  = require('util');

module.exports = {
    sendSMS: function (message,mobileNumber,callbackFunction) {

        callback = function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                callbackFunction(str);
            });
        }

        //http.get(options, callback).end();
        var url = 'http://www.winsms.co.za/api/batchmessage.asp?User=luke@rfm.org.za&Password=password85&message='+ encodeURIComponent(message)+'&Numbers='+mobileNumber;
        http.get(url, callback);
    }

}