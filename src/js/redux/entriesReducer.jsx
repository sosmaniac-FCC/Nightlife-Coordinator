export default function reducer(state={
    data: null,
    fetching: false,
    fetched: false,
    error: null
}, action) {
    
    switch(action.type) {
        case 'CLEAR_SPREAD': {
            return {
                ...state,
                data: []
            };
        }
        case 'FETCH_ENTRIES_START': {
            return {
                ...state,
                fetching: true,
                fetched: false,
                error: null
            };
        }
        case 'FETCH_ENTRIES_FULFILLED': {
            return {
                ...state,
                data: action.dataset,
                fetching: false,
                fetched: true,
                error: null
            };
        }
        case 'FETCH_ENTRIES_ERROR': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.error
            };
        }
        case 'TOGGLE_GOING_DECREMENT': {
            return {
                ...state,
                data: action.newDataset
            };
        }
        case 'TOGGLE_GOING_INCREMENT': {
            return {
                ...state,
                data: action.newDataset
            };
        }
        case 'TOGGLE_GOING_ERROR': {
            return {
                ...state,
                error: action.error
            };
        }
        default:
            return state;
    }
}