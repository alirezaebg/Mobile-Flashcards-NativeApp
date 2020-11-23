import { RECEIVE_ENTRIES, ADD_DECK, ADD_CARD } from '../actions'

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
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_CARD:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    questions: [...state[action.title].questions, action.card]
                }

            }
        default:
            return state
    }
}

export default entries