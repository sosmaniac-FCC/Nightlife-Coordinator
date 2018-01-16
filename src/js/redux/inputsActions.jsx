export function fetchSearchInput(value) {
    return (dispatch) => {
        dispatch({type: 'FETCH_SEARCH_INPUT', newInput: value});
    };
}