'use strict';

const fs = require('fs'),
	express = require('express'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	socketSession = require('express-socket.io-session'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	compression = require('compression'),
	Account = require('./models/account'),
	Strategy = require('passport-local').Strategy,
	routesIndex = require('./routes/index'),
	session = require('express-session')({
		secret: 'hunter2',
		resave: true,
		saveUninitialized: true
	}),
	logFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(compression());
app.use(logger('combined', {stream: logFile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`, {maxAge: 86400000 * 28}));
app.use(session);

io.use(socketSession(session, {
	autoSave: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(Account.authenticate()));

mongoose.connect('mongodb://localhost/secret-hitler-app'); // local
mongoose.Promise = global.Promise;


routesIndex();
