const express = require("express");
require("dotenv").config();
const uuid = require("uuid/v4");
const passport = require("passport");
const Strategy = require("passport-salesforce-oauth2").Strategy;
const myutils = require("./myutils");

// configure Salesforce OAuth if present
if (myutils.authenticationConfigured()) {
    passport.use(new Strategy({
        "authorizationURL": process.env.MY_DOMAIN ? `https://${MY_DOMAIN}.my.salesforce.com/services/oauth2/authorize` : process.env.SANDBOX ? "https://test.salesforce.com/services/oauth2/authorize" : undefined,
        "tokenURL": process.env.MY_DOMAIN ? `https://${MY_DOMAIN}.my.salesforce.com/services/oauth2/token` : process.env.SANDBOX ? "https://test.salesforce.com/services/oauth2/token" : undefined,
        "profileURL": process.env.MY_DOMAIN ? `https://${MY_DOMAIN}.my.salesforce.com/services/oauth2/userinfo` : process.env.SANDBOX ? "https://test.salesforce.com/services/oauth2/userinfo" : undefined,
        "clientID": process.env.CLIENT_ID,
        "clientSecret": process.env.CLIENT_SECRET,
        "callbackURL": process.env.REDIRECT_URI
    }, (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile);
    }));
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
}

// create app and use auth
const app = express();
app.use(require('express-session')({
    "secret": process.env.SESSION_SECRET || uuid(), 
    "resave": true, 
    "saveUninitialized": true
}));
// configure Salesforce OAuth if present
if (myutils.authenticationConfigured()) {
    app.use(passport.initialize());
    app.use(passport.session());
}

// configure
require("./configure-express")(passport, app);

// listen
app.listen(process.env.PORT || 8080);
