import AsyncStorage from '@react-native-async-storage/async-storage'
import { DECKS_STORAGE_KEY, setDecksInfo } from './_Data'

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(result => setDecksInfo(result))
}

export function getDeck(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((result) => {
            const data = JSON.parse(result)
            return data[id]
        })
}

export function saveDeckTitle(newDeck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [newDeck]: {
            title: newDeck,
            questions: []
        }
    }))
}

export function addCardToDeck(title, card) {
    getDeck(title)
        .then((deck) => {
            AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
                [title]:
                {
                    ...deck,
                    questions: [
                        ...deck.questions,
                        { question: card.question, answer: card.answer }
                    ]
                }
            }))
        })
}

//This is for testin purposes and not relevant to project delivery
export function manageData() {
    //to clear all the data, use the following command
    // AsyncStorage.clear()
    //to view the existing data, use the following lines of code
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        const data = JSON.parse(result)
        console.log(data)
    })
}