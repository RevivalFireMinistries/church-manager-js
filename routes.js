/* This file maps your route matches
 * to functions defined in various
 * controller classes
 */
app = module.parent.exports.app;

/* require your controllers here */
var siteController = require('./controllers/site');
var adminController = require('./controllers/admin');
var memberController = require('./controllers/memberCtrl');

/* Put routes here */

// main site routes
app.get('/', siteController.index);
app.get('/detail', siteController.detail);
app.get('/member/all/:id', memberController.getAssemblyMembers);

// admin routes
app.get('/admin', adminController.admin);

