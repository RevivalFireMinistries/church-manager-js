/* put controller actions here */


exports.index = function(req, res){
    event = {
        attendance : 134,
        eventDate  : new Date(),
        eventType  : "Sunday",
        offerings  :120.78,
        tithes     :6700.00,
        comment    :"Great service we had!\nThe word was awesome\nwe need a bigger venue"
    }
    email.sendEventEmail(event);
    res.send("Ndeipi!");
};

exports.detail = function(req, res){
    res.send({title: 'Detail'});
}






