import React, { Component } from 'react'
import { View, Text } from 'react-native'

class Deck extends Component {
    render() {
        const { route } = this.props
        return (
            <View>
                <Text>This is the Deck view!</Text>
                <Text>{route.params.name}</Text>
            </View>
        )
    }
}

export default Deck