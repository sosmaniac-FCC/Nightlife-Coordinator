const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const User = require('../src/js/models/user');
const config = require('../config');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
    
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user); 
    });
});

exports.twitter = passport.use(new TwitterStrategy({
    consumerKey: config.auth.twitterKey,
    consumerSecret: config.auth.twitterSecret,
    callbackURL: config.auth.twitterCallbackURL
}, (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
        User.findOne({twitterId: profile.id}, (err, user) => {
            if (err) return done(err);
            
            if (user) return done(null, user);
            else { 
                let newUser = new User();
                newUser.twitterId = profile.id;
                newUser.twitterToken = token;
                newUser.twitterUsername = profile.username;
                newUser.twitterDisplayName = profile.displayName;
                newUser.placesGoing = [];
                
                newUser.save((err) => {
                    if (err) throw err;
                    
                    return done(null, newUser);
                });
            }
        });
    });
}));