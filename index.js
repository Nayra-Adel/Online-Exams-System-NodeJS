var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');

var connection = require('./config');

var app = express();

var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret:"nayraaaaaaaa", resave:false, saveUninitialized:true}));

app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
 
app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
})  

app.get('/config.js', function (req, res) {  
   res.sendFile( __dirname + "/" + "config.js" );  
})  
 
app.get('/hr.html',function(req,res){
  ssn = req.session;
  if(ssn.email) {
    res.write('<h1> Hello '+ssn.name+'</h1>');
    res.end('<a href="logout">Logout</a>');
  } else {
    res.write('<h1>login first.</h1>');
    res.end('<a href="/login.html">Login</a>');
  }
});

app.get('/user.html', function (req, res) {  
	ssn = req.session;
	if(ssn.email) {
	res.write('<h1> Hello '+ssn.name+'</h1>');
	res.end('<a href="logout">Logout</a>');
	} else {
	res.write('<h1>login first.</h1>');
	res.end('<a href="/login.html">Login</a>');
	}
})  

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/index.html');
    }
  });
});

/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(8012);
