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
        default: return state;
    }
}