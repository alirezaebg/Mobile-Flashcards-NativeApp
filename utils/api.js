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

export function saveDeckTitle() {

}

export function addCardToDeck() {

}