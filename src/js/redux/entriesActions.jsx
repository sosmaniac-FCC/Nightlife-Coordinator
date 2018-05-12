import axios from 'axios'; // ======> Yelp API does not support client-side requests..
import $ from 'jquery'; // ======> Substitute to axios for server-side yelp requests..
import authorization from '../../../config';

/* global navigator */

export function fetchEntries(query) {
    return (dispatch) => {
        try {
            if (navigator.geolocation) {
                dispatch({type: 'FETCH_ENTRIES_START'});
                
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude.toFixed(0),
                        longitude = position.coords.longitude.toFixed(0);
                    
                    if (query) {
                        $.get('/businesses?latitude=' + latitude + '&longitude=' + longitude + '&term=' + query, businesses => {
                            let dataset = [];
                            
                            if (businesses.length > 0) {
                                Promise.all(businesses.map(business => axios.get(`/reviews?id=${business.id}`)))
                                .then(reviews => {
                                    Promise.all(businesses.map(business => axios.get(`/going?id=${business.id}`)))
                                    .then(people => {
                                        businesses.forEach((business, i) => dataset.push({
                                            id: business.id,
                                            name: business.name,
                                            image: business.image_url,
                                            url: business.url,
                                            review: reviews[i][0] ? reviews[i][0].text : '',
                                            going: +people[i].data
                                        }));
                                        
                                        dispatch({type: 'FETCH_ENTRIES_FULFILLED', dataset: dataset});
                                    }).catch(e => { throw e; });
                                }).catch(error => { 
                                    dispatch({type: 'FETCH_ENTRIES_ERROR', error});
                                });
                            }
                            else dispatch({type: 'FETCH_ENTRIES_FULFILLED', dataset: []});
                        });
                    } 
                    else dispatch({type: 'FETCH_ENTRIES_FULFILLED', dataset: []});
                }, e => { throw e; });
            }
            else throw 'Geolocational data is not available in your web browser.';
        } 
        catch (error) {
            dispatch({type: 'FETCH_ENTRIES_ERROR', error});
        }
    };
}

export function toggleGoing(businessId, arrayDisplay, index) {
    return (dispatch) => {
        axios.get('/status')
        .then((user) => {
            if (user.data != "" && user.data.twitterId) {
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
                window.location.href = authorization.auth.appURL + '/auth/twitter';
            }
        })
        .catch((error) => {
            dispatch({type: 'TOGGLE_GOING_ERROR', error: error});
        });
    };
}

export function clearSpread() {
    return (dispatch) => {
        dispatch({type: 'CLEAR_SPREAD'});  
    };
}