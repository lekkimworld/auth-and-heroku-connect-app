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


## Required Add-ons ##
* Heroku PostgreSQL (`heroku-postgresql:hobby-dev`)
* Heroku Connect (`herokuconnect:demo`)
* Papertrail (`papertrail:choklad`)