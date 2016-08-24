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
    formatMoney : function (money) {
        return accounting.formatMoney(money,"R");
    }
};

