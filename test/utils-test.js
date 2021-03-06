//inorder to run the unit tests execute the command mocha from the root dir

var util = require('./../utils/Utils');
var sms = require('./../notifications/sms-engine');
var config = require('./../config/config');

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai


describe('Tests : ', function() {
    it('display a human friendly date', function() {
        console.log(util.getFriendlyDate(new Date()));
        expect(0).to.equal(0);
    });

    it('display money', function() {
        console.log(util.formatMoney(1200.78787));
        expect(0).to.equal(0);
    });


    it('send sms', function() {
        sms.sendSMS("test sms",27722621278,function(response){
            console.log("the response comes here");
            console.log(response);
        });
       expect(0).to.equal(0);
    });
});