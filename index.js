var express=require("express");
var bodyParser=require('body-parser');
var session = require('express-session');
var path = require('path');

var connection = require('./DB/config');

var app = express();
app.set('view engine', 'ejs');

var authenticateController=require('./Controller/authenticate');
var userRegisterController=require('./Controller/user-register');
var hrRegisterController=require('./Controller/hr-register');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({secret:"nayraaaaaaaa", resave:false, saveUninitialized:true}));

app.get('/register_hr', function (req, res) {  
   res.render("register_hr.ejs");  
}) 

app.get('/register_user', function (req, res) {  
   res.render("register_user.ejs");  
}) 

app.get('/login', function (req, res) {  
   res.render("login.ejs");  
})  

app.get('/config.js', function (req, res) {  
   res.render("config.js");  
})  
 
app.get('/HR-Home',function(req,res){
  ssn = req.session;
  if(ssn.email) {
       res.render("hr.ejs", {
          welcome: ssn.name
       } );  
  } else {
    res.write('<h1>login first.</h1>');
    res.end('<a href="/welcome">Login</a>');
  }
});

app.get('/User-Home', function (req, res) {  
	ssn = req.session;
	if(ssn.email) {
	     res.render("hr.ejs", {
          welcome: ssn.name
       } ); 
	} else {
	res.write('<h1>login first.</h1>');
	res.end('<a href="/welcome">Login</a>');
	}
})  

app.get('/welcome',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.render("welcome.ejs");  
    }
  });
});

/* route to handle login and registration */
app.post('/api/userRegister',userRegisterController.candidateRegister);
app.post('/api/hrRegister',hrRegisterController.hrRegister);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/Controller/user-register', userRegisterController.candidateRegister);
app.post('/Controller/hr-register', hrRegisterController.hrRegister);
app.post('/Controller/authenticate', authenticateController.authenticate);
app.listen(8012);