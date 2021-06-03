import {createStore} from 'redux'

const initState = {
    name: 'naixes'
}

function reducer(state = initState, action) {
    switch(action.type) {
        case "CHANGE_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export function createClientStore() {
    return createStore(reducer, window.REDUX_STORE)
}

export function createServerStore() {
    return createStore(reducer)
}