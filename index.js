var express = require('express');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/login.route');
const adminRoutes = require('./routes/admin.route');

var app = express();
var bodyParser = require('body-parser');



 app.use(bodyParser.json());
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Accept, X-Custom-Header, Authorization'
    );
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

   //login
  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);
  app.use(errorController.get404);
  app.use(errorController.get500);
  
 // app.use('/api/cliente', require('./routes/cliente.route'));
 // app.use('/api/login', require('./routes/login.route'));

 // set port
 app.listen(3001, function () {
     console.log('Node app is running on port 3001');
 });
 module.exports = app;