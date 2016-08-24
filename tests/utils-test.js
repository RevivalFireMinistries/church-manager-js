var util = require('./../utils/Utils');

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai


describe('Date format', function() {
    it('display a human friendly date', function() {
        console.log(util.getFriendlyDate(new Date()));
        expect(0).to.equal(0);
    });

    it('display money', function() {
        console.log(util.formatMoney(1200.78787));
        expect(0).to.equal(0);
    });
});