# auth-and-heroku-connect-app
Simple Heroku app with Salesforce authentication and Heroku Connect for data. 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Installation ##
* Create an app on Heroku
* Deploy app code directly from Github
* Add Add-ons (see below)
* Create required environment variables
    - `CLIENT_ID`
    - `CLIENT_SECRET`
    - `REDIRECT_URI`
* Create optional environment variables
    - `AUTH_URL` (url for authorization endpoint if not not the default on login.salesforce.com)
    - `TOKEN_URL` (url for token endpoint if not not the default on login.salesforce.com)
    - `PROFILE_URL` (url for user profile endpoint if not not the default on login.salesforce.com)
    - `SANDBOX` (if running against a sandbox - authorization, token and profile URL will be using test.salesforce.com instead of login.salesforce.com)
    - `MY_DOMAIN` (My Domain (i.e. "velocity-dream-9352" of "velocity-dream-9352.my.salesforce.com") if that's required i.e. for scratch orgs)
    - `PAGE_TITLE` The title at the top of the pages
    - `NO_ADD_ACTION` Set to hide the plus-action at the top of the page

When deciding which endpoint to use the most specific is read before `SANDBOX` before `MY_DOMAIN` i.e. if there is an `AUTH_URL` it's used, if not we query `SANDBOX` and lastly look for `MY_DOMAIN` before finally using the default endpoint on login.salesforce.com.

## Required Add-ons ##
* Heroku PostgreSQL (`heroku-postgresql:hobby-dev`)
* Heroku Connect (`herokuconnect:demo`)

## Optional Add-ons ##
* Papertrail (`papertrail:choklad`)

