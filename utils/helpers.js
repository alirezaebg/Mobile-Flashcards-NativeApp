import AsyncStorage from '@react-native-async-storage/async-storage'
import { DECKS_STORAGE_KEY, setDecksInfo } from './_Data'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'flashcards:notifications'

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

export function deleteDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
        const data = JSON.parse(decks)
        data[title] = undefined
        delete data[title]
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

const createNotification = {
    title: 'Quiz time!',
    body: "😀 Reminder to complete your daily quiz!",
    ios: {
        sound: true,
    },
    android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(19)
                            tomorrow.setMinutes(0)


                            Notifications.scheduleNotificationAsync({
                                content: {
                                    ...createNotification
                                },
                                trigger: {
                                    hour: 1,
                                    minute: 0,
                                    repeats: true,
                                }
                            })

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

//This is for testin purposes and not relevant to project delivery
export function manageData() {
    //to clear all the data, use the following command
    // AsyncStorage.clear()
    //to view the existing data, use the following lines of code
    // AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
    //     const data = JSON.parse(result)
    //     console.log(data)
    // })
}