# auth-and-heroku-connect-app
Simple Heroku app with Salesforce authentication and Heroku Connect for data. 

## Installation ##
* Create an app called `heroku-app-with-auth-connect`
* Deploy app code directly from Github
* Add Add-ons (see below)
* Create required environment variables
    - `CLIENT_ID`
    - `CLIENT_SECRET`
    - `REDIRECT_URI`
    - `SANDBOX` (if running against a sandbox - authorization and token URL will be using test.salesforce.com instead of login.salesforce.com)


## Required Add-ons ##
* Heroku PostgreSQL (`heroku-postgresql:hobby-dev`)
* Heroku Connect (`herokuconnect:demo`)
* Papertrail (`papertrail:choklad`)