import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { receiveEntries } from '../actions'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { yellow } from '../utils/colors'
import { AppLoading } from 'expo'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Decks extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        // AsyncStorage.clear()
        const { dispatch } = this.props
        getDecks()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(() => this.setState(() => ({ ready: true })))
    }

    render() {
        const { entries } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <ScrollView>
                {Object.keys(entries).map(elem => (
                    <TouchableOpacity
                        key={elem}
                        onPress={() => this.props.navigation.navigate(
                            'Deck',
                            { name: elem }
                        )}
                        style={styles.deckBtn}>
                        <Text style={[styles.deckText, { fontSize: 20 }]}>
                            {entries[elem].title}
                        </Text>
                        <Text style={[styles.deckText, { fontSize: 16 }]}>
                            {entries[elem].questions.length}
                            {entries[elem].questions.length <= 1 ? ' card' : ' cards'}
                        </Text>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
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
    deckText: {
        textAlign: 'center',
        padding: 5
    }
})

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(Decks)