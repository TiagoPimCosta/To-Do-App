require('dotenv').config()

const port = process.env.PORT || 3000;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const usersModel = require('./models/user.model');

//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}			
		}
		response.redirect('/');
	}
};
app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});

app.set('view engine', 'ejs');
app.set('views','views');

global.connection = mysql.createConnection({
	host     : process.env.DATABASE_HOST,
	user     : process.env.DATABASE_USER,
	password : process.env.DATABASE_PASS,
	database : process.env.DATABASE_SCHEMA,
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function(){
	console.log('Server started at: ');
	console.log('		localhost:' + port);
	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
		console.log("		" + add + ":" + port);
  	})
});

//Midleware that sets the isAuthenticated variable in all views
app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

app.use('/', require('./controllers/index.route'));
app.use('/public', express.static('assets'));
app.use('/users', require('./controllers/user.route'));

//new
app.use('/login', require('./controllers/login.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/profile', require('./controllers/profile.route'));

