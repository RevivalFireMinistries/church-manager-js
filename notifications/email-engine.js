var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var _jade = require('jade');
var fs = require('fs');
var user = require('./../models/user');



module.exports = {
    sendEventEmail: function (evt) {
        // Create a SMTP transport object

        var transport = nodemailer.createTransport(
            smtpTransport('smtps://esavvy%40rfm.org.za:kingdom85@smtp.rfm.org.za')
        );

        logger.debug('SMTP Configured');
        var template = process.cwd() + '/templates/event_report.jade';

        fs.readFile(template,evt, 'utf8', function(err, file) {
            if (err) {
                //handle errors
                logger.info('ERROR!');
                return null;
            }
            else {
                //get assembly users
                user.getByAssembly(evt.assembly,function(result){
                    var emailAddresses = "";
                    for (i = 0; i < result.length; i++) {
                        emailAddresses += result[i].email+", ";
                    }

                    //compile jade template into function
                    var compiledTmpl = _jade.compile(file, {filename: template});
                    // set context to be used in template
                    //var event = JSON.parse(JSON.stringify(evt));
                    event = {
                        attendance : evt.attendance,
                        eventDate  : util.getFriendlyDate(evt.eventDate),
                        eventType  : evt.eventType,
                        offerings  : util.formatMoney(evt.offerings),
                        tithes     : util.formatMoney(evt.tithes),
                        comment    : evt.comment
                    }
                    // get html back as a string with the context applied;
                    htmlString = compiledTmpl(event);

                    // Message object
                    var mailOptions = {

                        // sender info
                        from: 'Fire Manager <esavvy@rfm.org.za>',

                        // Comma separated list of recipients
                        to: emailAddresses,

                        // Subject of the message
                        subject: event.eventType+' Service Report ✔',

                        // plaintext body
                        text: '',

                        // HTML body
                        html:htmlString
                    };

                    logger.debug('Sending Mail');
                    transport.sendMail(mailOptions, function(error){
                        if(error){
                            logger.info('Error occured');
                            logger.info(error.message);
                            return;
                        }
                        logger.info('Message sent successfully!');

                        // if you don't want to use this transport object anymore, uncomment following line
                        transport.close(); // close the connection pool
                    });

                });

            }
        });
    }
};