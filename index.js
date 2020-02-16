const express = require("express");
require("dotenv").config();
const uuid = require("uuid/v4");
const passport = require("passport");
const Strategy = require("passport-salesforce-oauth2").Strategy;

// configure Salesforce OAuth
passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
}, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// create app and use auth
const app = express();
app.use(require('express-session')({
    "secret": process.env.SESSION_SECRET || uuid(), 
    "resave": true, 
    "saveUninitialized": true
}));
app.use(passport.initialize());
app.use(passport.session());

// configure
require("./configure-express")(passport, app);

// listen
app.listen(process.env.PORT || 8080);