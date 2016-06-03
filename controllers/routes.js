var member = require('./../models/member');

module.exports = {
    configure: function(app) {
        app.get('/member/', function(req, res) {
            member.getAll(res);
        });

        app.get('/member/:id/', function(req, res) {
            member.getById(req.params.id, res);
        });

        app.post('/member/', function(req, res) {
            member.create(req.body, res);
        });

        app.put('/member/', function(req, res) {
            member.update(req.body, res);
        });

        app.delete('/member/:id/', function(req, res) {
            member.delete(req.params.id, res);
        });
    }
};