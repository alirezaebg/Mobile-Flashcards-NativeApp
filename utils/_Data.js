import AsyncStorage from '@react-native-async-storage/async-storage'
export const DECKS_STORAGE_KEY = 'flashcards:decks'

const initialDecks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

function setInitialDecks() {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialDecks))
    return initialDecks
}

export function setDecksInfo(result) {
    return result === null 
    ? setInitialDecks()
    : JSON.parse(result)      
}
