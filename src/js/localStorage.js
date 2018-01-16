export function loadState() {
    try {
        const serializedState = window.localStorage.getItem('state');
        if (serializedState == null) {
            return undefined;
        }
        else {
            return JSON.parse(serializedState);
        }
    }
    catch (error) {
        return undefined;
    }
}

export function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem('state', serializedState);
    }
    catch (error) {
        console.log(error);
    }
}