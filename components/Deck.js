import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, fadeGreen, pink, orange } from '../utils/colors'

function createDeckView({name, entry, navigation}) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.center}>
            <Text
                style={{ fontSize: 36, marginBottom: 10 }}>
                {`${name} Trivia`}
            </Text>
            <Text
                style={{ fontSize: 20, marginBottom: 10 }}>
                {entry.questions.length === 0 && `No card has been added yet!`}
                {entry.questions.length === 1 && `${entry.questions.length} card`}
                {entry.questions.length > 1 && `${entry.questions.length} cards`}
            </Text>
            <TouchableOpacity
                style={[styles.addCardBtn, styles.btn]}
                onPress={() => navigation.navigate('New Card', { title: name })}
            >
                <Text style={{ fontSize: 20 }}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quizBtn, styles.btn]}>
                <Text style={{ fontSize: 20 }}>Start Quiz</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

class Deck extends Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            title: this.props.name,
        })
    }
    render() {
        return (
            createDeckView({...this.props})
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 100,
    },
    center: {
        alignItems: 'center',
    },
    addCardBtn: {
        backgroundColor: pink,
        marginTop: 100,
        marginBottom: 20,
    },
    quizBtn: {
        backgroundColor: fadeGreen,
        marginVertical: 20
    },
    btn: {
        padding: 15,
        borderRadius: 7,
        width: 200,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps(entries, { route, navigation }) {
    const { name } = route.params
    return {
        name,
        navigation,
        entry: entries[name]
    }

}

export default connect(mapStateToProps)(Deck)