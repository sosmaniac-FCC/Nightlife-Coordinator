import axios from 'axios'; // ======> Yelp API does not support client-side requests..
import $ from 'jquery'; // ======> Substitute to axios for server-side yelp requests..
import authorization from '../../../config';

/* global navigator */

export function fetchEntries(query) {
    return (dispatch) => {
        dispatch({type: 'FETCH_ENTRIES_START'});
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude.toFixed(0);
                const longitude = position.coords.longitude.toFixed(0);
                console.log(latitude, longitude);
                
                $.get('/businesses?latitude=' + latitude + '&longitude=' + longitude + '&term=' + query + '', (businesses) => {
                    let dataset = [];
                    
                    businesses.forEach((business, i) => {
                        $.get('/reviews?id=' + business.id + '', (reviews) => {
                            axios.get('/going?id=' + business.id)
                            .then((people) => {
                                dataset.push({
                                    id: business.id,
                                    name: business.name,
                                    image: business.image_url,
                                    url: business.url,
                                    review: reviews[0] != undefined ? reviews[0].text : '...',
                                    going: +people.data
                                });
                                
                                if (i == businesses.length - 1) {
                                    dispatch({type: 'FETCH_ENTRIES_FULFILLED', dataset: dataset});
                                }
                            })
                            .catch((error) => {
                                dispatch({type: 'FETCH_ENTRIES_ERRROR', error: '|==> ' + error});
                            });
                        });
                    });
                });
            });
        }
        else {
            dispatch({type: 'FETCH_ENTRIES_ERROR', error: '|==> Geolocational data is not currently available. Please try again later...'});
        }
    };
}

export function toggleGoing(businessId, arrayDisplay, index) {
    return (dispatch) => {
        axios.get('/status')
        .then((user) => {
            if (user.data != "" && user.data.twitterId != undefined) {
                const willDecrement = user.data.placesGoing.includes(businessId);
                const newDataset = [];
                for (let i = 0; i < arrayDisplay.length; i++) {
                    if (i != index) {
                        newDataset[i] = {
                            ...arrayDisplay[i]
                        };
                    }
                    else {
                        newDataset[i] = {
                            ...arrayDisplay[i],
                            going: willDecrement ? (arrayDisplay[i].going - 1) : (arrayDisplay[i].going + 1)
                        };
                    }
                }
                dispatch({type: willDecrement ? 'TOGGLE_GOING_DECREMENT' : 'TOGGLE_GOING_INCREMENT', newDataset: newDataset});
                $.post('/input', {type: willDecrement ? 'dec' : 'inc', businessId: businessId});
            }
            else {
                dispatch({type: 'TOGGLE_GOING_LOGIN_START'});
                
                window.location.href = authorization.auth.appURL + '/auth/twitter';
                
                // need to figure out how to save application state
                /*
                axios.get('/auth')
                .then((result) => {
                    dispatch({type: 'TOGGLE_GOING_LOGIN_FULFILLED'});
                })
                .catch((error) => {
                    dispatch({type: 'TOGGLE_GOING_LOGIN_ERROR'});
                });
                */
            }
        })
        .catch((error) => {
            dispatch({type: 'TOGGLE_GOING_ERROR', error: error});
        });
    };
}