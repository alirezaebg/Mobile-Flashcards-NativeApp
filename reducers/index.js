import { RECEIVE_ENTRIES, ADD_DECK } from '../actions'

function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries,
            }
        case ADD_DECK:
            return {
                ...state,
                [action.title] : {
                    title: action.title,
                    questions: []
                }
            }
        default:
            return state
    }
}

export default entries