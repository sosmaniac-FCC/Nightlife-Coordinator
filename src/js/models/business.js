const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema({
    businessId: {
        type: String
    },
    peopleGoing: {
        type: Number
    }
});

const Business = mongoose.model('Business', BusinessSchema);

module.exports = Business;