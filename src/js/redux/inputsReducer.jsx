export default function reducer(state={
    searchInput: '',
    loggingIn: false,
    loggedIn: false,
    error: null
}, action) {
    
    switch(action.type) {
        case 'FETCH_SEARCH_INPUT': {
            return {
                ...state,
                searchInput: action.newInput
            };
        }
        case 'TOGGLE_GOING_LOGIN_START': {
            return {
                ...state,
                loggingIn: true
            };
        }
        case 'TOGGLE_GOING_LOGIN_FULFILLED': {
            return {
                ...state,
                loggingIn: false,
                loggedIn: true
            };
        }
        case 'TOGGLE_GOING_LOGIN_ERROR': {
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                error: action.error
            };
        }
        default:
            return state;
    }
}