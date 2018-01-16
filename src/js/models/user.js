const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    twitterId: {
        type: Number
    },
    twitterToken: {
        type: String
    },
    twitterUsername: {
        type: String
    },
    twitterDisplayName: {
        type: String
    },
    placesGoing: {
        type: Array
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;