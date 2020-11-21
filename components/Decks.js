import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getDecks } from '../utils/api'

class Decks extends Component {

    componentDidMount() {
        getDecks()
        .then(data => console.log(data))
    }

    render() {
        return (
            <View>
                <Text>This is the Decks tab!</Text>
            </View>
        )
    }
}

export default Decks