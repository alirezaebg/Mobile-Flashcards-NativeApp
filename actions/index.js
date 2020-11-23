export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addDeck (title) {
    return {
        type: ADD_DECK,
        title,
    }
}

export function addCard (title, card) {
    return {
        type: ADD_CARD,
        title,
        card
    }
}

export function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title
    }
}