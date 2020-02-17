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
    app.use(require('body-parser').json());
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
     * Show account list.
     */
    app.get("/accounts", require("connect-ensure-login").ensureLoggedIn(), (req, res) => {
        dbpool.query("select id, sfid, name from salesforce.account order by name asc").then(result => {
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

    /**
     * Save account.
     */
    app.post("/accounts", (req, res) => {
        res.type("json");
        if (!req.user) return res.status(401).send({"error": true, "message": "Unauthorized"});

        // get body and validate
        const input = req.body;
        if (!input.hasOwnProperty("name") || !input.name) {
            return res.status(417).send({"error": true, "message": "Missing name in \"name\" property"});
        }
        dbpool.query(`insert into salesforce.account (name) values ('${input.name}');`).then(result => {
            return res.status(201).send({"name": input.name}).end();
        }).catch(err => {
            return res.status(500).send({"error": true, "message": err.message});
        })
    })

}