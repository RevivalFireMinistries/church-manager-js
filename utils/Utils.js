var moment = require('moment');
var accounting = require('accounting');

module.exports = {
    generateRandomString : function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    getFriendlyDate : function (date) {
        return moment(date).format("ddd do MMM YYYY");
    },
    getShortDate : function (date) {
        return moment(date).format("DD/MM/YYYY");
    },
    formatMoney : function (money) {
        return accounting.formatMoney(money,"R");
    },
    getTitheSMSText : function(tithe){
        return "RFM: Hi "+tithe.name+", Your tithe payment of "+this.formatMoney(tithe.amount)+" made on "+this.getShortDate(tithe.datecreated)+" has been received.Thank you and Stay Blessed!For more info visit www.rfm.org.za."
    }
};

