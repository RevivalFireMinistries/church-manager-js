/* This file maps your route matches
 * to functions defined in various
 * controller classes
 */
app = module.parent.exports.app;

/* require your controllers here */
var siteController = require('./controllers/site');
var adminController = require('./controllers/admin');
var memberController = require('./controllers/memberCtrl');
var authCtrl = require('./controllers/authenticationCtrl');
var assemblyController = require('./controllers/assemblyCtrl');

/* Put routes here */

// main site routes
app.get('/', siteController.index);
app.get('/detail', siteController.detail);
//Auth
app.post('/auth/login', authCtrl.authenticate);

//Assembly
app.get('/assemblies', authCtrl.authenticate);
app.get('/assemblies/:id', authCtrl.authenticate);
app.post('/assemblies', authCtrl.authenticate);
app.put('/assemblies/:id', authCtrl.authenticate);
//Members
app.get('/assemblies/:id/members', memberController.getAssemblyMembers);
app.post('/assemblies/:id/member', memberController.create);
app.put('/assemblies/:id/member/:id', memberController.update);


// admin routes
app.get('/admin', adminController.admin);

