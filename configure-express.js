const express = require("express");
const {Pool} = require("pg");
const exphbs = require("express-handlebars")
const path = require("path");

const buildDefaultContext = (req) => {
    return {
        "user": req.user
    }
}

// database connection pool
const dbpool = new Pool({
    'connectionString': process.env.DATABASE_URL,
    'ssl': process.env.NODE_ENV === 'production' ? true : false
});

module.exports = (passport, app) => {
    app.use(express.static(path.join(__dirname, "public")));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.engine("handlebars", exphbs({"defaultLayout": "main"}));
    app.set("view engine", "handlebars");

    /**
     * Logout
     */
    app.get("/logout", (req, res) => {
        req.logout();
        return res.redirect("/");
    })

    /**
     * Login
     */
    app.get("/login", (req, res) => {
        return res.redirect("/login/salesforce");
    })
    app.get("/login/salesforce", passport.authenticate("salesforce"));

    /** 
     * Called when returning from Salesforce past auth.
     */
    app.get("/login/salesforce/return", passport.authenticate("salesforce", {"failureRedirect": '/login'}), (req, res) => {
        res.redirect('/');
    });

    /**
     * Show root page.
     */
    app.get("/", (req, res) => {
        if (req.user) {
            return res.render("root_auth", buildDefaultContext(req));
        } else {
            return res.render("root_unauth");
        }
    })

    /**
     * Showe account list.
     */
    app.get("/accounts", require("connect-ensure-login").ensureLoggedIn(), (req, res) => {
        dbpool.query("select id, name from salesforce.account order by name desc").then(result => {
            const ctx = Object.assign({
                "accounts": result.rows
            }, buildDefaultContext(req));
            return res.render("accounts", ctx);
        }).catch(err => {
            const ctx = Object.assign({
                "error": true,
                "message": err.message
            }, buildDefaultContext(req));
            return res.render("error", ctx);
        })
    });

}