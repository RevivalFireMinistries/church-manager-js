/* put controller actions here */
var nodemailer = require('nodemailer');
var _jade = require('jade');
var fs = require('fs');

exports.index = function(req, res){
    sendMail();
    res.send("Ndeipi!");
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}




var sendMail = function(){
    // Create a SMTP transport object
    var transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: "esavvy@rfm.org.za",
            pass: "kingdom85"
        }
    });

    logger.debug('SMTP Configured');
    var template = process.cwd() + '/templates/event-report.jade';

    fs.readFile(template, 'utf8', function(err, file) {
        if (err) {
            //handle errors
            logger.debug('ERROR!');
            return null;
        }
        else {
            //compile jade template into function
            var compiledTmpl = _jade.compile(file, {filename: template});
            // set context to be used in template
            var context = {maintainer: {
                    name: 'Forbes Lindesay',
                    twitter: '@ForbesLindesay',
                    blog: 'forbeslindesay.co.uk'
                }
            }
            // get html back as a string with the context applied;
            htmlString = compiledTmpl(context);

            // Message object
            var message = {

                // sender info
                from: 'Fire Manager <esavvy@rfm.org.za>',

                // Comma separated list of recipients
                to: '"Russel" <russel@rfm.org.za>',

                // Subject of the message
                subject: 'Nodemailer is unicode friendly ✔',

                // plaintext body
                text: 'Hello to myself!',

                // HTML body
                html:htmlString
            };

            logger.debug('Sending Mail');
            transport.sendMail(message, function(error){
                if(error){
                    console.log('Error occured');
                    console.log(error.message);
                    return;
                }
                logger.debug('Message sent successfully!');

                // if you don't want to use this transport object anymore, uncomment following line
                //transport.close(); // close the connection pool
            });
        }
    });

}

