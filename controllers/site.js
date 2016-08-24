/* put controller actions here */


exports.index = function(req, res){
    event = {
        attendance : 134,
        eventDate  : new Date(),
        eventType  : "Midweek Service",
        offerings  :779.89,
        tithes     :60000.00,
        comment    :"Wonderful service we had with a very long comment to see if tghis will actually break the styling of the email report because you get people who type a lot!\nThe word was awesome\nwe need a bigger venue"
    }
    email.sendEventEmail(event);
    res.send("Hello!");
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}






