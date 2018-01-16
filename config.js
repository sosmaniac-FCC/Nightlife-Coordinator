module.exports = {
    auth: {
        appURL: process.env.APP_URL,
        yelpKey: process.env.YELP_KEY,
        twitterKey: process.env.TWITTER_KEY,
        twitterSecret: process.env.TWITTER_SECRET,
        twitterCallbackURL: process.env.APP_URL + '/auth/twitter/callback'
    }
};