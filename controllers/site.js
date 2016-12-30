/* put controller actions here */


exports.index = function(req, res){
    event = {
        assembly   : 6,
        attendance : 134,
        eventDate  : new Date(),
        eventType  : "TEST REPORT ",
        offerings  :779.89,
        tithes     :60000.00,
        comment    :"THIS IS A TEST REPORT!"
    }
   //email.sendEventEmail(event);
    sms.sendSMS("test sms the second one",27722621278,function(resp){
        console.log(resp);
    });
    res.send("Hello!");
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}






