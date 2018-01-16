var fetch = require('isomorphic-fetch');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');

var User = require('../src/js/models/user');
var Business = require('../src/js/models/business');
var authenticate = require('./authenticate');

const router = express.Router();

const config = {
	headers: {
		Authorization: 'Bearer ' + process.env.YELP_KEY
	}
};

router.use(bodyParser.json());

router.post('/input', (req, res) => {
    if (req.body.type == "inc") {
        Business.findOne({businessId: req.body.businessId}, (error, result) => {
            if (error) throw error;
            
            if (result == null) {
                Business.create({businessId: req.body.businessId, peopleGoing: 1}, (error, created) => {
                    if (error) throw error;
                            
                    User.findOne({twitterId: req.user.twitterId}, (error, user) => {
                        if (error) throw error;
                        
                        user.placesGoing.push(req.body.businessId);
                        user.markModified('placesGoing');
                        user.save((error, saved) => {
                            if (error) throw error;
                            
                            res.end();
                        });
                    });
                });
            }
            else {
                result.peopleGoing++;
                result.markModified('peopleGoing');
                result.save((error, updated) => {
                    if (error) throw error;
                    
                    User.findOne({twitterId: req.user.twitterId}, (error, user) => {
                        if (error) throw error;
                        
                        user.placesGoing.push(req.body.businessId);
                        user.markModified('placesGoing');
                        user.save((error, saved) => {
                            if (error) throw error;
                            
                            res.end();
                        });
                    });
                });
            }
        });
    }
    else {
        Business.findOne({businessId: req.body.businessId}, (error, result) => {
            if (error) throw error;
            
            result.peopleGoing--;
            result.markModified('peopleGoing');
            result.save((error, updated) => {
                if (error) throw error;
                
                User.findOne({twitterId: req.user.twitterId}, (error, user) => {
                    if (error) throw error;
                    
                    user.placesGoing.splice(user.placesGoing.indexOf(req.body.businessId), 1);
                    user.markModified('placesGoing');
                    user.save((error, saved) => {
                        if (error) throw error;
                        
                        res.end();
                    });
                });
            });
        });
    }
});

// local storage? YES PLEASE!
router.get('/auth/twitter/callback', passport.authenticate('twitter', {successRedirect: '/search', failureRedirect: '/search'}), (req, res) => {
    res.end();
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/status', (req, res) => {  
	res.send(req.user);
});

router.get('/going', (req, res) => {
	Business.findOne({businessId: req.query.id}, (error, business) => {
	    if (error) throw 'Bad response from database: ' + error;
	    
	    res.send(business == null ? '0' : business.peopleGoing.toString());
	});
});

router.get('/reviews', (req, res) => {
	fetch('https://api.yelp.com/v3/businesses/' + req.query.id + '/reviews', config)
	.then((response) => {
		if (response.status >= 400) {
			res.send('Bad response from server: ' + JSON.stringify(response));
		}
		else {
			response.json()
			.then((data) => {
				res.send(data.reviews);
			});
		}
	});
});

router.get('/businesses', (req, res) => {
    console.log(req.query.latitude, req.query.longitude, req.query.term, 'bars');
	fetch('https://api.yelp.com/v3/businesses/search?latitude=' + req.query.latitude + '&longitude=' + req.query.longitude + '&categories=bars&term=' + req.query.term + '', config)
	.then((response) => {
		if (response.status >= 400) {
			res.send('Bad response from server: ' + JSON.stringify(response));
		}
		else {
			response.json()
			.then((data) => {
				res.send(data.businesses);	
			});
		}
	});
});

module.exports = router;