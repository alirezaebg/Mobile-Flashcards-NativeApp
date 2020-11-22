import React, { Component } from 'react'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ceil } from 'react-native-reanimated'
import { getDecks } from '../utils/api'
import { yellow } from '../utils/colors'

class Decks extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        getDecks()
            .then(data => {
                this.setState(() => ({ data }))
            })
    }

    render() {
        const { data } = this.state
        return (
            <View>
                {Object.keys(data).map(elem => (
                    <TouchableOpacity
                        key={elem}
                        style={styles.deckBtn}>
                        <Text style={styles.deckTitleText}>
                            {data[elem].title}
                        </Text>
                        <Text style={styles.deckTitleText}>
                            {data[elem].questions.length}
                            {data[elem].questions.length <= 1 ? ' card' : ' cards'}
                        </Text>
                    </TouchableOpacity>
                ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deckBtn: {
        backgroundColor: yellow,
        borderWidth: 2,
        padding: 10,
        borderRadius: 7,
        height: 85,
        marginVertical: 20,
        marginHorizontal: 40,
    },
    deckTitleText: {
        textAlign: 'center',
        padding: 5,
        fontSize: 18,
    }
})

export default Decks