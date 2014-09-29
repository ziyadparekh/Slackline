var version = process.env.API_VERSION;

//module dependencies
var toobusy = require('toobusy');
var express = require('express');
var path = require('path');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorHandler');
var morgan = require('morgan');
var session = require('express-session');
var app = express();
var index = require('./routes/index');

//dont crash on overload
app.use(function(req, res, next) {
    if (toobusy()) {
        res.send(503, "We have too much traffic try again in a few seconds, sorry.");
    } else {
        next();
    }
});

process.on('uncaughtException', function(err){
    console.log(err);
    process.exit(0);
});

if(process.env.PORT){
    app.use(morgan('combined'));
}else{
    app.use(morgan('combined'));
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(session({
        secret: 'tobo!',
        maxAge: 36000009,
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 60 * 60 * 10008,
            secure: true
        }
    }));
}

//error management
app.use(function(err, req, res, next){
    if(err.stack)
        console.log(err.stack);
    if(err && err.redirect)
        return res.redirect(err.redirect);
    else if(err == "503")
        return res.send('Token has expired. Please try again.');
    else if(err)
        return res.render('error', {error: err});
    else
        return res.send("An error occured. Please try again in a few seconds.");
});

//static and port
app.enable('trust proxy');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
if(process.env.PORT){
    app.set('views', __dirname + '/dist/views');
    app.use(express.static(path.join(__dirname, 'dist/public')));
} else{
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname, 'public')));
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

//routes
app.get('*', index.index);

module.exports = app;
