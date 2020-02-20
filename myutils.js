module.exports = {
    authenticationConfigured: () => {
        return process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.REDIRECT_URI;
    }
}
