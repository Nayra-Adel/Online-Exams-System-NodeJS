var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');

var connection = require('./DB/config');

var app = express();

var authenticateController=require('./controllers/authenticate-controller');
var userRegisterController=require('./controllers/user-register-controller');
var hrRegisterController=require('./controllers/hr-register-controller');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret:"nayraaaaaaaa", resave:false, saveUninitialized:true}));

app.get('/View/register_hr.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "View/register_hr.html" );  
}) 

app.get('/View/register_user.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "View/register_user.html" );  
}) 

app.get('/View/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "View/login.html" );  
})  

app.get('/config.js', function (req, res) {  
   res.sendFile( __dirname + "/" + "config.js" );  
})  
 
app.get('/View/hr.html',function(req,res){
  ssn = req.session;
  if(ssn.email) {
    res.write('<h1> Hello '+ssn.name+'</h1>');
    res.end('<a href="/View/welcome">Logout</a>');
  } else {
    res.write('<h1>login first.</h1>');
    res.end('<a href="/login.html">Login</a>');
  }
});

app.get('/View/user.html', function (req, res) {  
	ssn = req.session;
	if(ssn.email) {
	res.write('<h1> Hello '+ssn.name+'</h1>');
	res.end('<a href="/View/welcome">Logout</a>');
	} else {
	res.write('<h1>login first.</h1>');
	res.end('<a href="/login.html">Login</a>');
	}
})  

app.get('/View/welcome',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.sendFile( __dirname + "/" + "View/welcome.html" );  
    }
  });
});

/* route to handle login and registration */
app.post('/api/userRegister',userRegisterController.candidateRegister);
app.post('/api/hrRegister',hrRegisterController.hrRegister);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/user-register-controller', userRegisterController.candidateRegister);
app.post('/controllers/hr-register-controller', hrRegisterController.hrRegister);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);
app.listen(8012);