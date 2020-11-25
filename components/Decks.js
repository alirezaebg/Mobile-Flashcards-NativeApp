import React, { Component } from 'react'
import { Animated, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { receiveEntries } from '../actions'
import { connect } from 'react-redux'
import { getDecks, manageData } from '../utils/helpers'
import { yellow, orange } from '../utils/colors'
import { AppLoading } from 'expo'

//custom component that is used to show each deck
function CustomButton({ elem, onPress, bounceValue, length, title }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.deckBtn}>
            <Animated.Text style={[styles.deckText, { fontSize: 20, transform: [{ scale: bounceValue }] }]}>
                {title}
            </Animated.Text>
            <Animated.Text style={[styles.deckText, { fontSize: 16, transform: [{ scale: bounceValue }] }]}>
                {length}
                {length <= 1 ? ' card' : ' cards'}
            </Animated.Text>
        </TouchableOpacity>
    )
}

class Decks extends Component {
    state = {
        ready: false
    }
    componentDidMount() {
        manageData()
        const { dispatch } = this.props
        getDecks()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(() => this.setState(() => ({ ready: true })))
    }
    handlePress = (elem, bounceValue) => {
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 100, toValue: 1.04, useNativeDriver: true }),
            Animated.spring(bounceValue, { toValue: 1, friction: 4, useNativeDriver: true })
        ]).start(() => {
            this.props.navigation.navigate(
                'Deck',
                { name: elem }
            )
        })
    }
    render() {
        const { entries } = this.props
        const { ready } = this.state
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                <Text style={styles.titleText}>Mobile Flashcards</Text>
                {Object.keys(entries).length === 0
                    ? <Text style={styles.noDeckText}>No decks to display❗ {'\n'}Add a new deck 👇</Text>
                    : Object.keys(entries).map(elem => {
                        const bounceValue= new Animated.Value(1)
                        return (
                            <CustomButton
                                key={elem}
                                elem={elem}
                                onPress={() => this.handlePress(elem, bounceValue)}
                                bounceValue={bounceValue}
                                title={entries[elem].title}
                                length={entries[elem].questions.length}
                            />
                        )
                    })
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
    },
    titleText: {
        fontSize: 30,
        textAlign: "center"
    },
    noDeckText: {
        fontSize: 24,
        textAlign: "center",
        color: orange,
        marginTop: 30
    }
})

function mapStateToProps(entries) {
    console.log(entries)
    return {
        entries
    }
}

export default connect(mapStateToProps)(Decks)